import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  Shield,
  Award,
  ExternalLink,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const reputationHistory = [
  { month: 'Jul', score: 4.2 },
  { month: 'Aug', score: 4.3 },
  { month: 'Sep', score: 4.5 },
  { month: 'Oct', score: 4.6 },
  { month: 'Nov', score: 4.7 },
  { month: 'Dec', score: 4.8 },
];

const metrics = [
  { name: 'On-Time Delivery', score: 95, weight: '25%' },
  { name: 'Quality Consistency', score: 92, weight: '30%' },
  { name: 'Communication', score: 88, weight: '15%' },
  { name: 'Sample Accuracy', score: 96, weight: '20%' },
  { name: 'Buyer Feedback', score: 90, weight: '10%' },
];

const recentFeedback = [
  {
    id: '1',
    from: 'ABC Corporation',
    rating: 5,
    comment: 'Excellent quality mangoes. Delivery was on time and packaging was perfect.',
    date: '2024-01-10',
    order: 'ORD-2024-001',
  },
  {
    id: '2',
    from: 'XYZ Ltd',
    rating: 4,
    comment: 'Good product quality. Minor delay in shipping documentation.',
    date: '2024-01-05',
    order: 'ORD-2023-089',
  },
  {
    id: '3',
    from: 'Global Foods Co',
    rating: 5,
    comment: 'Outstanding service. Will definitely order again.',
    date: '2024-01-02',
    order: 'ORD-2023-085',
  },
];

const achievements = [
  { name: 'Verified Exporter', icon: Shield, earned: true },
  { name: 'Top Seller', icon: Award, earned: true },
  { name: '50+ Orders', icon: CheckCircle, earned: true },
  { name: '100+ Orders', icon: CheckCircle, earned: false },
  { name: 'Premium Partner', icon: Star, earned: false },
];

export default function Reputation() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Reputation & Trust Score</h1>
          <p className="text-muted-foreground">
            Your on-chain reputation based on performance and buyer feedback.
          </p>
        </div>

        {/* Main Score Card */}
        <div className="bg-card border border-border p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 bg-foreground text-background flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">4.8</span>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= 4 ? 'fill-current' : ''}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Excellent Reputation</h2>
                <p className="text-muted-foreground mb-4">
                  Your reputation is in the top 10% of exporters on the platform.
                </p>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-sm text-green-600">+0.2 from last month</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <Button variant="outline" className="gap-2">
                <ExternalLink size={16} />
                View On-Chain Attestation
              </Button>
              <p className="text-xs text-muted-foreground">
                Verified on blockchain • Last updated: Jan 15, 2024
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Breakdown */}
          <div className="bg-card border border-border p-6">
            <h3 className="font-medium mb-6">Score Breakdown</h3>
            <div className="space-y-6">
              {metrics.map((metric) => (
                <div key={metric.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Weight: {metric.weight}
                      </span>
                      <span className="font-medium">{metric.score}%</span>
                    </div>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Reputation History */}
          <div className="bg-card border border-border p-6">
            <h3 className="font-medium mb-6">Reputation History</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={reputationHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[3.5, 5]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--foreground))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card border border-border p-6">
          <h3 className="font-medium mb-6">Achievements & Badges</h3>
          <div className="flex flex-wrap gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className={`flex items-center gap-3 p-4 border ${
                  achievement.earned
                    ? 'border-foreground bg-secondary/50'
                    : 'border-border opacity-50'
                }`}
              >
                <achievement.icon size={24} />
                <div>
                  <p className="font-medium text-sm">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.earned ? 'Earned' : 'Locked'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">Recent Feedback</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="p-4 bg-secondary/30 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{feedback.from}</p>
                    <p className="text-xs text-muted-foreground">{feedback.order}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={star <= feedback.rating ? 'fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">"{feedback.comment}"</p>
                <p className="text-xs text-muted-foreground">{feedback.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
