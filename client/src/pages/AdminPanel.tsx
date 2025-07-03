import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export const AdminPanel = (): JSX.Element => {
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

        {/* Main content area */}
        <Card>
          <CardHeader>
            <CardTitle>Панель администратора</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Панель готова к настройке под ваши требования.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};