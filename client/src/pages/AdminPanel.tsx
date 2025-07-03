import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AdminPanel = (): JSX.Element => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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
    const link = `${baseUrl}/?context_data=${randomString}&price=${encodeURIComponent(price)}&name=${encodeURIComponent(name)}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast({
        title: "Скопировано!",
        description: "Ссылка скопирована в буфер обмена",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
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

        {/* Link Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Генератор ссылок</CardTitle>
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
              Сгенерировать ссылку
            </Button>

            {generatedLink && (
              <div className="space-y-2">
                <Label>Сгенерированная ссылка:</Label>
                <div className="flex gap-2">
                  <Input
                    value={generatedLink}
                    readOnly
                    className="flex-1 font-mono text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  При переходе по ссылке плейсхолдеры {"{price}"} и {"{name}"} будут заменены на указанные значения.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};