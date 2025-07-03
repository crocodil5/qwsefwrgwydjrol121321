
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogOut } from "lucide-react";

export const AdminPanel = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [payments, setPayments] = useState([
    { id: 1, amount: "1,00 €", sender: "Nina Pflaum", status: "pending", date: "2024-01-15" },
    { id: 2, amount: "25,50 €", sender: "Max Mueller", status: "completed", date: "2024-01-14" },
    { id: 3, amount: "10,00 €", sender: "Anna Schmidt", status: "rejected", date: "2024-01-13" },
  ]);

  const [newPayment, setNewPayment] = useState({
    amount: "",
    sender: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (loginData.username === "crocs" && loginData.password === "crocswork") {
      setIsAuthenticated(true);
      setLoginData({ username: "", password: "" });
    } else {
      setLoginError("Неверный логин или пароль");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
  };

  const handleAddPayment = () => {
    if (newPayment.amount && newPayment.sender) {
      const payment = {
        id: payments.length + 1,
        amount: newPayment.amount,
        sender: newPayment.sender,
        status: "pending",
        date: new Date().toISOString().split('T')[0],
      };
      setPayments([...payments, payment]);
      setNewPayment({ amount: "", sender: "" });
    }
  };

  const updatePaymentStatus = (id: number, newStatus: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: newStatus } : payment
    ));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      completed: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Вход в админ панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="Введите логин"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Введите пароль"
                  required
                />
              </div>
              {loginError && (
                <Alert variant="destructive">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Управление платежами и настройками</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payments">Платежи</TabsTrigger>
            <TabsTrigger value="add-payment">Добавить платеж</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Список платежей</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Отправитель</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell className="font-medium">{payment.amount}</TableCell>
                        <TableCell>{payment.sender}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="space-x-2">
                          {payment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updatePaymentStatus(payment.id, "completed")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Принять
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updatePaymentStatus(payment.id, "rejected")}
                              >
                                Отклонить
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-payment">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новый платеж</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Сумма</Label>
                    <Input
                      id="amount"
                      placeholder="10,00 €"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender">Отправитель</Label>
                    <Input
                      id="sender"
                      placeholder="Имя отправителя"
                      value={newPayment.sender}
                      onChange={(e) => setNewPayment({ ...newPayment, sender: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddPayment} className="w-full">
                  Добавить платеж
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки системы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Валюта по умолчанию</Label>
                    <Input id="currency" defaultValue="EUR" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commission">Комиссия (%)</Label>
                    <Input id="commission" defaultValue="2.5" type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Email для уведомлений</Label>
                  <Input id="notification-email" type="email" placeholder="admin@example.com" />
                </div>
                <Button className="w-full">Сохранить настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
