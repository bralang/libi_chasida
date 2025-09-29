import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Search, MoreVertical, Phone, Mail, CheckCircle } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'דוד לוי',
    businessName: 'לוי אלקטרוניקה',
    phone: '052-1234567',
    email: 'david@levi-elec.co.il',
    source: 'אתר',
    status: 'new',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'רונית כהן',
    businessName: 'כהן ייעוץ עסקי',
    phone: '054-9876543',
    email: 'ronit@cohen-consulting.co.il',
    source: 'הפניה',
    status: 'contacted',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'משה אברהם',
    businessName: 'אברהם שיווק',
    phone: '053-5551234',
    email: 'moshe@avraham-marketing.co.il',
    source: 'לינקדאין',
    status: 'qualified',
    createdAt: '2024-01-13'
  }
];

const Leads = () => {
  const [leads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'contacted': return 'secondary';
      case 'qualified': return 'warning';
      case 'converted': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'חדש';
      case 'contacted': return 'יצרנו קשר';
      case 'qualified': return 'מתאים';
      case 'converted': return 'הומר ללקוח';
      default: return status;
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">לידים</h1>
          <p className="text-muted-foreground mt-1">
            ניהול לידים והמרה ללקוחות
          </p>
        </div>
        <Button>
          <UserPlus className="ml-2 h-4 w-4" />
          ליד חדש
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              סך הכל לידים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              לידים חדשים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.filter(l => l.status === 'new').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              מתאימים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.filter(l => l.status === 'qualified').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              שיעור המרה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חיפוש לידים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">שם</TableHead>
                <TableHead className="text-right">שם עסק</TableHead>
                <TableHead className="text-right">טלפון</TableHead>
                <TableHead className="text-right">דוא"ל</TableHead>
                <TableHead className="text-right">מקור</TableHead>
                <TableHead className="text-right">סטטוס</TableHead>
                <TableHead className="text-right">תאריך יצירה</TableHead>
                <TableHead className="text-right">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.businessName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {lead.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {lead.email}
                    </div>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(lead.status)}>
                      {getStatusText(lead.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CheckCircle className="ml-2 h-4 w-4" />
                          המר ללקוח
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="ml-2 h-4 w-4" />
                          התקשר
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="ml-2 h-4 w-4" />
                          שלח מייל
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
