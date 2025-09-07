import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  Search, 
  Plus, 
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

// Mock client data
const mockClients = [
  {
    id: 1,
    name: 'חברת הטכנולוגיה בע"מ',
    contactPerson: 'יוסי כהן',
    email: 'yossi@tech-company.com',
    phone: '03-1234567',
    status: 'active',
    lastActivity: '2024-01-15',
    taxType: 'חברה',
    revenue: '₪2,500,000'
  },
  {
    id: 2,
    name: 'מסעדת הים התיכון',
    contactPerson: 'מרים לוי',
    email: 'miriam@restaurant.com',
    phone: '04-9876543',
    status: 'active',
    lastActivity: '2024-01-12',
    taxType: 'עוסק מורשה',
    revenue: '₪750,000'
  },
  {
    id: 3,
    name: 'אברהם שמואל - יבוא ייצוא',
    contactPerson: 'אברהם שמואל',
    email: 'avraham@import-export.com',
    phone: '02-5551234',
    status: 'pending',
    lastActivity: '2024-01-10',
    taxType: 'עוסק פטור',
    revenue: '₪450,000'
  },
  {
    id: 4,
    name: 'סטודיו עיצוב דנה',
    contactPerson: 'דנה אברהם',
    email: 'dana@design-studio.com',
    phone: '09-8887777',
    status: 'active',
    lastActivity: '2024-01-14',
    taxType: 'עוסק מורשה',
    revenue: '₪320,000'
  },
  {
    id: 5,
    name: 'חברת הבניין והפיתוח בע"מ',
    contactPerson: 'משה ישראל',
    email: 'moshe@construction.com',
    phone: '08-6665555',
    status: 'inactive',
    lastActivity: '2023-12-20',
    taxType: 'חברה',
    revenue: '₪5,200,000'
  }
];

export default function Clients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(mockClients);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = mockClients.filter(client =>
      client.name.toLowerCase().includes(value.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(value.toLowerCase()) ||
      client.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'pending': return 'בהמתנה';
      case 'inactive': return 'לא פעיל';
      default: return 'לא ידוע';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            תיקי לקוחות
          </h1>
          <p className="text-muted-foreground mt-1">
            ניהול תיקי לקוחות ומעקב אחר פעילותם
          </p>
        </div>
        <Button variant="hero" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          הוספת לקוח חדש
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חיפוש לקוחות..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">סוג לקוח</Button>
              <Button variant="outline">סטטוס</Button>
              <Button variant="outline">מיון</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">סה"כ לקוחות</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">לקוחות פעילים</p>
                <p className="text-2xl font-bold">134</p>
              </div>
              <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">לקוחות חדשים החודש</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">הכנסות החודש</p>
                <p className="text-2xl font-bold">₪45K</p>
              </div>
              <div className="h-10 w-10 bg-accent-foreground/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>רשימת לקוחות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>שם הלקוח</TableHead>
                  <TableHead>איש קשר</TableHead>
                  <TableHead>פרטי התקשרות</TableHead>
                  <TableHead>סוג מס</TableHead>
                  <TableHead>מחזור</TableHead>
                  <TableHead>סטטוס</TableHead>
                  <TableHead>פעילות אחרונה</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow 
                    key={client.id} 
                    className="hover:bg-accent/50 cursor-pointer"
                    onClick={() => navigate(`/clients/${client.id}`)}
                  >
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.contactPerson}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.taxType}</TableCell>
                    <TableCell className="font-medium">{client.revenue}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(client.status)}>
                        {getStatusText(client.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(client.lastActivity).toLocaleDateString('he-IL')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            צפייה
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            עריכה
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            דוחות
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}