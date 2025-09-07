import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  Calendar,
  Clock,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock data for demonstration
  const todayTasks = [
    { id: 1, title: 'הכנת דוח שנתי - לקוח אברהם', priority: 'high', dueTime: '14:00' },
    { id: 2, title: 'פגישה עם לקוח חדש - חברת טכנולוגיה', priority: 'medium', dueTime: '16:30' },
    { id: 3, title: 'בדיקת מסמכים - יבוא ייצוא בע"מ', priority: 'low', dueTime: '18:00' },
    { id: 4, title: 'שליחת דוח מס הכנסה', priority: 'high', dueTime: '10:00' },
  ];

  const stats = [
    { title: 'לקוחות פעילים', value: '142', icon: Users, trend: '+5%' },
    { title: 'דוחות החודש', value: '28', icon: FileText, trend: '+12%' },
    { title: 'משימות פתוחות', value: '15', icon: CheckSquare, trend: '-3%' },
    { title: 'הכנסות החודש', value: '₪45,000', icon: TrendingUp, trend: '+8%' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
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

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">שלום, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString('he-IL', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button variant="hero" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          משימה חדשה
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-success mt-1">{stat.trend}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              המשימות שלי היום
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{task.dueTime}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={getPriorityColor(task.priority)}>
                  {getPriorityText(task.priority)}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              צפייה בכל המשימות
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions & Progress */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                יעדי החודש
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>דוחות שנתיים</span>
                  <span>28/35</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>לקוחות חדשים</span>
                  <span>5/10</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>ייעוץ זום</span>
                  <span>12/15</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Urgent Notifications */}
          <Card className="shadow-card border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="h-5 w-5" />
                התראות דחופות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">דוח מע"מ - מועד אחרון מחר</p>
                  <p className="text-muted-foreground mt-1">לקוח: חברת הבניין בע"מ</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">פגישה בעוד שעה</p>
                  <p className="text-muted-foreground mt-1">יבוא ייצוא בע"מ - ייעוץ מס</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}