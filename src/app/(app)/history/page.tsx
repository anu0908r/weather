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
import { format, formatDistanceToNow } from 'date-fns';
import { History as HistoryIcon } from 'lucide-react';
import { getSearchHistory } from '@/app/actions/user.actions';

export default async function HistoryPage() {
  const result = await getSearchHistory(20);
  const history = result.data || [];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-card">
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
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    No search history yet. Start searching for cities!
                  </TableCell>
                </TableRow>
              ) : (
                history.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item.city}
                      {item.country && <span className="text-muted-foreground ml-2">({item.country})</span>}
                    </TableCell>
                    <TableCell>
                      {format(new Date(item.searchedAt), 'MMMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatDistanceToNow(new Date(item.searchedAt), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
