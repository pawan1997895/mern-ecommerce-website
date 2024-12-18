import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Assuming Lucide React is installed

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <Card className="p-6 sm:p-10 shadow-xl rounded-lg border-2 border-green-300 bg-white max-w-sm sm:max-w-md text-center">
        <CardHeader className="p-0">
          <div className="flex flex-col items-center">
            <CheckCircle size={48} className="text-green-500 mb-4 sm:mb-6 animate-bounce" />
            <CardTitle className="text-2xl sm:text-4xl font-bold text-green-600">
              Payment Successful!
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mt-4 text-sm sm:text-base">
            Your order has been processed successfully. Thank you for shopping with us!
          </p>
          <Button
            className="mt-6 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => navigate("/shop/account")}
          >
            View Order
          </Button>
          <Button
            className="mt-4 ml-4 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
            onClick={() => navigate("/shop/home")}
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
