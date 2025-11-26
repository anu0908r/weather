import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { SearchHistory } from '@/lib/types';
import { addDays, format } from 'date-fns';
import { History as HistoryIcon } from 'lucide-react';

// Mock data for search history. In a real app, this would be fetched from Firestore.
const getMockHistory = async (): Promise<SearchHistory[]> => {
  return [
    { id: '1', userId: '12345', city: 'New York', searchedAt: new Date() },
    { id: '2', userId: '12345', city: 'London', searchedAt: addDays(new Date(), -1) },
    { id: '3', userId: '12345', city: 'Tokyo', searchedAt: addDays(new Date(), -2) },
    { id: '4', userId: '12345', city: 'Paris', searchedAt: addDays(new Date(), -3) },
    { id: '5', userId: '12345', city: 'Sydney', searchedAt: addDays(new Date(), -5) },
  ];
};

export default async function HistoryPage() {
  const history = await getMockHistory();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-6 w-6" />
            Search History
          </CardTitle>
          <CardDescription>
            Here are the recent locations you've searched for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">City</TableHead>
                <TableHead>Searched On</TableHead>
                <TableHead className="text-right">Time Ago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.city}</TableCell>
                  <TableCell>
                    {format(item.searchedAt, 'MMMM d, yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {format(item.searchedAt, "eee, h:mm a")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
