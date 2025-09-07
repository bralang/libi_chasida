import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowRight,
  Building,
  Users,
  CheckSquare,
  FileText,
  Settings,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Briefcase
} from 'lucide-react';

// Mock data - בפרויקט אמיתי זה יגיע מ-API
const mockClientData = {
  1: {
    id: 1,
    businessNumber: '514123456',
    name: 'חברת הטכנולוגיה בע"מ',
    owners: ['יוסי כהן', 'שרה לוי'],
    field: 'פיתוח תוכנה',
    address: 'רחוב הרצל 25, תל אביב',
    phone: '03-1234567',
    email: 'info@tech-company.com',
    status: 'active',
    hasInventory: true,
    homeBasedBusiness: false,
    notes: 'לקוח VIP - מחזור גבוה',
    contacts: [
      {
        id: 1,
        name: 'יוסי כהן',
        gender: 'זכר',
        phone: '050-1234567',
        email: 'yossi@tech-company.com',
        relationship: 'בעלים יחיד'
      },
      {
        id: 2,
        name: 'שרה לוי',
        gender: 'נקבה',
        phone: '052-9876543',
        email: 'sarah@tech-company.com',
        relationship: 'בעלים בשותפות'
      },
      {
        id: 3,
        name: 'דני אברהם',
        gender: 'זכר',
        phone: '054-5555555',
        email: 'danny@tech-company.com',
        relationship: 'עובד'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'הגשת דוח מס חברות',
        status: 'בתהליך',
        priority: 'גבוהה',
        dueDate: '2024-02-15',
        assignee: 'מרים גולד'
      },
      {
        id: 2,
        title: 'עדכון רישום ברשם החברות',
        status: 'ממתין',
        priority: 'בינונית',
        dueDate: '2024-02-20',
        assignee: 'שרה כהן'
      }
    ],
    processes: [
      {
        id: 1,
        name: 'הליך ביקורת מס הכנסה',
        status: 'פעיל',
        startDate: '2024-01-10',
        description: 'ביקורת שגרתית לשנת 2023'
      },
      {
        id: 2,
        name: 'הגשת בקשה להקלה במס',
        status: 'הושלם',
        startDate: '2023-12-01',
        description: 'בקשה לפטור ממס רכישה'
      }
    ],
    reports: [
      {
        id: 1,
        name: 'דוח מס חברות 2023',
        startDate: '2024-01-01',
        status: 'הוגש',
        submissionDate: '2024-01-31',
        file: 'company-tax-2023.pdf'
      },
      {
        id: 2,
        name: 'דוח מע"מ - רבעון 4',
        startDate: '2024-01-15',
        status: 'בתהליך',
        submissionDate: null,
        file: null
      }
    ]
  }
};

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  
  const client = mockClientData[Number(id)];
  
  if (!client) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">תיק לקוח לא נמצא</h1>
          <Button onClick={() => navigate('/clients')} className="mt-4">
            חזרה לרשימת תיקי לקוחות
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'פעיל':
      case 'הוגש':
      case 'הושלם': 
        return 'success';
      case 'בתהליך':
      case 'ממתין': 
        return 'warning';
      case 'inactive':
      case 'לא פעיל': 
        return 'secondary';
      default: 
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'inactive': return 'לא פעיל';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'גבוהה': return 'destructive';
      case 'בינונית': return 'warning';
      case 'נמוכה': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/clients')}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לתיקי לקוחות
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building className="h-8 w-8" />
              {client.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-muted-foreground">מספר עוסק: {client.businessNumber}</span>
              <Badge variant={getStatusColor(client.status)}>
                {getStatusText(client.status)}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="hero">
          <Settings className="h-4 w-4 mr-2" />
          עריכת תיק
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            מידע כללי
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            אנשי קשר
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            משימות
          </TabsTrigger>
          <TabsTrigger value="processes" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            תהליכים
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            דוחות
          </TabsTrigger>
        </TabsList>

        {/* General Info Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>פרטי העסק</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">שם העסק</label>
                    <p className="text-lg font-medium">{client.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">מספר עוסק</label>
                    <p className="text-lg">{client.businessNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">בעלי העסק</label>
                    <p className="text-lg">{client.owners.join(', ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">תחום פעילות</label>
                    <p className="text-lg">{client.field}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">כתובת</label>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <p className="text-lg">{client.address}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">טלפון</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{client.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">דוא"ל</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{client.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">סטטוס</label>
                    <div>
                      <Badge variant={getStatusColor(client.status)}>
                        {getStatusText(client.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-muted-foreground">ניהול מלאי:</label>
                  <Badge variant={client.hasInventory ? 'success' : 'secondary'}>
                    {client.hasInventory ? 'כן' : 'לא'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-muted-foreground">עסק מהבית:</label>
                  <Badge variant={client.homeBasedBusiness ? 'success' : 'secondary'}>
                    {client.homeBasedBusiness ? 'כן' : 'לא'}
                  </Badge>
                </div>
              </div>
              {client.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">הערות</label>
                  <p className="text-lg bg-muted/50 p-3 rounded-md">{client.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>אנשי קשר</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>שם</TableHead>
                      <TableHead>מגדר</TableHead>
                      <TableHead>טלפון</TableHead>
                      <TableHead>דוא"ל</TableHead>
                      <TableHead>קשר</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>{contact.gender}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{contact.relationship}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>משימות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>משימה</TableHead>
                      <TableHead>סטטוס</TableHead>
                      <TableHead>עדיפות</TableHead>
                      <TableHead>תאריך יעד</TableHead>
                      <TableHead>אחראי</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(task.dueDate).toLocaleDateString('he-IL')}
                          </div>
                        </TableCell>
                        <TableCell>{task.assignee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processes Tab */}
        <TabsContent value="processes" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>תהליכים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>שם התהליך</TableHead>
                      <TableHead>סטטוס</TableHead>
                      <TableHead>תאריך התחלה</TableHead>
                      <TableHead>תיאור</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.processes.map((process) => (
                      <TableRow key={process.id}>
                        <TableCell className="font-medium">{process.name}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(process.status)}>
                            {process.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(process.startDate).toLocaleDateString('he-IL')}
                          </div>
                        </TableCell>
                        <TableCell>{process.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>דוחות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>שם הדוח</TableHead>
                      <TableHead>תאריך התחלה</TableHead>
                      <TableHead>סטטוס</TableHead>
                      <TableHead>תאריך הגשה</TableHead>
                      <TableHead>קובץ מצורף</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(report.startDate).toLocaleDateString('he-IL')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {report.submissionDate ? (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {new Date(report.submissionDate).toLocaleDateString('he-IL')}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">טרם הוגש</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {report.file ? (
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <FileText className="h-3 w-3" />
                              {report.file}
                            </Button>
                          ) : (
                            <span className="text-muted-foreground">אין קובץ</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}