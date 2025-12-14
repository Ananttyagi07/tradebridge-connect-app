import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react';

const conversations = [
  {
    id: '1',
    name: 'ABC Corporation',
    lastMessage: 'The sample has been approved. Proceeding with the order.',
    time: '2 min ago',
    unread: 2,
    avatar: 'AC',
  },
  {
    id: '2',
    name: 'XYZ Ltd',
    lastMessage: 'Can you provide the shipping documents?',
    time: '1 hour ago',
    unread: 0,
    avatar: 'XL',
  },
  {
    id: '3',
    name: 'Global Foods Co',
    lastMessage: 'Thank you for the delivery. Rating submitted.',
    time: '3 hours ago',
    unread: 0,
    avatar: 'GF',
  },
  {
    id: '4',
    name: 'Tech Industries Inc',
    lastMessage: 'We need a revised quotation with the new specifications.',
    time: 'Yesterday',
    unread: 1,
    avatar: 'TI',
  },
  {
    id: '5',
    name: 'Heavy Industries',
    lastMessage: 'Production milestone 2 completed. Please approve.',
    time: 'Yesterday',
    unread: 0,
    avatar: 'HI',
  },
];

const messages = [
  {
    id: '1',
    sender: 'ABC Corporation',
    content: 'Hello, we received the sample shipment yesterday.',
    time: '10:30 AM',
    isOwn: false,
  },
  {
    id: '2',
    sender: 'You',
    content: 'Great! How does the quality look?',
    time: '10:32 AM',
    isOwn: true,
  },
  {
    id: '3',
    sender: 'ABC Corporation',
    content: 'The quality is excellent. The mangoes are fresh and meet our specifications.',
    time: '10:35 AM',
    isOwn: false,
  },
  {
    id: '4',
    sender: 'You',
    content: 'Wonderful! Should I proceed with the full order?',
    time: '10:36 AM',
    isOwn: true,
  },
  {
    id: '5',
    sender: 'ABC Corporation',
    content: 'Yes, please. We would like to place an order for 500kg as discussed.',
    time: '10:40 AM',
    isOwn: false,
  },
  {
    id: '6',
    sender: 'You',
    content: 'Perfect. I will create the order and send you the escrow details shortly.',
    time: '10:42 AM',
    isOwn: true,
  },
  {
    id: '7',
    sender: 'ABC Corporation',
    content: 'The sample has been approved. Proceeding with the order.',
    time: '10:45 AM',
    isOwn: false,
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex bg-card border border-border">
        {/* Conversations List */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-4 border-b border-border cursor-pointer hover:bg-secondary/50 transition-colors ${
                  selectedConversation.id === conv.id ? 'bg-secondary' : ''
                }`}
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center text-sm font-medium">
                {selectedConversation.avatar}
              </div>
              <div>
                <p className="font-medium">{selectedConversation.name}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical size={18} />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 ${
                      message.isOwn
                        ? 'bg-foreground text-background'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-background/70' : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip size={18} />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
