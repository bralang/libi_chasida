import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckSquare, 
  Search, 
  Plus, 
  Calendar,
  Clock,
  User,
  FileText,
  AlertCircle
} from 'lucide-react';

const mockTasks = [
  {
    id: 1,
    title: 'הכנת דוח שנתי - חברת הטכנולוגיה בע"מ',
    description: 'הכנת דוח מס שנתי לשנת 2023',
    client: 'חברת הטכנולוגיה בע"מ',
    assignee: 'שרה כהן',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-01-20',
    createdDate: '2024-01-10',
    category: 'דוחות'
  },
  {
    id: 2,
    title: 'ייעוץ מס לעסק חדש',
    description: 'פגישת ייעוץ ראשונית עם לקוח חדש',
    client: 'סטודיו עיצוב דנה',
    assignee: 'מיכל לוי',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-01-18',
    createdDate: '2024-01-12',
    category: 'ייעוץ'
  },
  {
    id: 3,
    title: 'בדיקת מסמכים - יבוא ייצוא',
    description: 'בדיקת מסמכי יבוא וייצוא לצורך דוח מע"מ',
    client: 'אברהם שמואל - יבוא ייצוא',
    assignee: 'רחל אברהם',
    priority: 'low',
    status: 'completed',
    dueDate: '2024-01-15',
    createdDate: '2024-01-08',
    category: 'בדיקות'
  },
  {
    id: 4,
    title: 'הגשת דוח מע"מ',
    description: 'הגשת דוח מע"מ רבעוני למס הכנסה',
    client: 'מסעדת הים התיכון',
    assignee: 'דנה ישראל',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-16',
    createdDate: '2024-01-05',
    category: 'הגשות'
  }
];

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'דחוף';
      case 'medium': return 'בינוני';
      case 'low': return 'נמוך';
      default: return 'רגיל';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'הושלם';
      case 'in-progress': return 'בביצוע';
      case 'pending': return 'ממתין';
      default: return 'לא ידוע';
    }
  };

  const filterTasks = () => {
    let filtered = mockTasks;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(task => task.status === activeTab);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTabCount = (status: string) => {
    if (status === 'all') return mockTasks.length;
    return mockTasks.filter(task => task.status === status).length;
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CheckSquare className="h-8 w-8" />
            ניהול משימות
          </h1>
          <p className="text-muted-foreground mt-1">
            מעקב ואיגון משימות יומיות ופרויקטים
          </p>
        </div>
        <Button variant="hero" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          משימה חדשה
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">כל המשימות</p>
                <p className="text-2xl font-bold">{getTabCount('all')}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">בביצוע</p>
                <p className="text-2xl font-bold">{getTabCount('in-progress')}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">הושלמו</p>
                <p className="text-2xl font-bold">{getTabCount('completed')}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ממתינות</p>
                <p className="text-2xl font-bold">{getTabCount('pending')}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש משימות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tasks Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">כל המשימות ({getTabCount('all')})</TabsTrigger>
          <TabsTrigger value="pending">ממתינות ({getTabCount('pending')})</TabsTrigger>
          <TabsTrigger value="in-progress">בביצוע ({getTabCount('in-progress')})</TabsTrigger>
          <TabsTrigger value="completed">הושלמו ({getTabCount('completed')})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filterTasks().map((task) => (
              <Card key={task.id} className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant={getPriorityColor(task.priority)}>
                            {getPriorityText(task.priority)}
                          </Badge>
                          <Badge variant={getStatusColor(task.status)}>
                            {getStatusText(task.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{task.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{task.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>מועד: {new Date(task.dueDate).toLocaleDateString('he-IL')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        עריכה
                      </Button>
                      {task.status !== 'completed' && (
                        <Button variant="default" size="sm">
                          סמן כהושלם
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}