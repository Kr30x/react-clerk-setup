import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, UsersIcon } from './Icons';
import { ActivityIcon, MoveHorizontalIcon } from 'lucide-react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

const statsCards = [
  { title: 'Total Clients', value: '125', change: '+10 this month', Icon: UsersIcon },
  { title: 'Meetings Scheduled', value: '42', change: '+5 this week', Icon: CalendarIcon },
  { title: 'Checkout rate', value: '92%', change: '-2% this month', Icon: ActivityIcon },
  { title: 'Upcoming Events', value: '8', change: '+2 this week', Icon: CalendarIcon },
];



const StatsCard = ({ title, value, change, Icon }) => {
  const isPositive = change.startsWith('+');
  const ArrowIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${colorClass}`}>
          <ArrowIcon className="w-4 h-4 mr-1" />
          <span>{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const RevenueChart = () => {
  const monthlyData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 6200 },
    { month: "Mar", revenue: 7800 },
    { month: "Apr", revenue: 7200 },
    { month: "May", revenue: 8500 },
    { month: "Jun", revenue: 9100 },
  ];

  const weeklyData = [
    { week: "Week 1", revenue: 1200 },
    { week: "Week 2", revenue: 1400 },
    { week: "Week 3", revenue: 1100 },
    { week: "Week 4", revenue: 1600 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Monthly and weekly revenue trends</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
          <LineChartComponent data={monthlyData} dataKey="month" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Weekly Revenue</h3>
          <LineChartComponent data={weeklyData} dataKey="week" />
        </div>
      </CardContent>
    </Card>
  );
};

const LineChartComponent = ({ data, dataKey }) => (
  <ChartContainer
    config={{
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
    }}
  >
    <LineChart
      accessibilityLayer
      data={data}
      margin={{
        left: 12,
        right: 12,
        top: 12,
        bottom: 12,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey={dataKey}
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
      <Line dataKey="revenue" type="natural" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
    </LineChart>
  </ChartContainer>
);

const UpcomingMeetings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Meetings</CardTitle>
      <CardDescription>View your upcoming Meetings and events</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-auto">
        <Calendar />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Monday, April 24</div>
          <div className="text-muted-foreground">3 Meetings</div>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          {['Math Lesson', 'English Lesson', 'Science Lab'].map((lesson, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{lesson}</div>
                <div className="text-xs text-muted-foreground">{`${index + 10}:00 ${index < 2 ? 'AM' : 'PM'}`}</div>
              </div>
              <Button variant="outline" size="sm">
                Remind Me
              </Button>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ClientList = () => (
  <Card>
    <CardHeader>
      <CardTitle>Client List</CardTitle>
      <CardDescription>Manage your clients and their progress</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            {['Name', 'Priority', 'Progress', 'Last Session', ''].map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { name: 'John Doe', priority: 'A-', progress: 92, lastSession: '2023-04-15' },
            { name: 'Jane Smith', priority: 'B+', progress: 85, lastSession: '2023-04-12' },
            { name: 'Michael Johnson', priority: 'B', progress: 90, lastSession: '2023-04-10' },
          ].map((client, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.priority}</TableCell>
              <TableCell>
                <Progress value={client.progress} aria-label={`${client.progress}% attendance`} />
              </TableCell>
              <TableCell>{client.lastSession}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoveHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {['View', 'Edit', 'Delete'].map((action, i) => (
                      <DropdownMenuItem key={i}>{action}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export function Feed() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>
      <RevenueChart />
      <div className="grid gap-4 md:grid-cols-2">
        <UpcomingMeetings />
        <ClientList />
      </div>
    </div>
  );
}