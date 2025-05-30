import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";
import type { Control } from "react-hook-form";

export function PasswordField({ control }: { control: Control<any> }) {
  const [isView, setIsView] = useState(false);

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={isView ? "text" : "password"}
                id="password"
                placeholder=" "
                {...field}
              />
              {isView ? (
                <div
                  className="absolute right-1 top-1 z-10 h-7 w-7 items-center justify-center p-1 hover:cursor-pointer hover:bg-gray-100 rounded-sm"
                  onClick={() => setIsView(!isView)}
                >
                  <Eye className="text-gray w-full h-full" />
                </div>
              ) : (
                <div
                  className="absolute right-1 top-1 z-10 h-7 w-7 items-center justify-center p-1 hover:cursor-pointer hover:bg-gray-100 rounded-sm"
                  onClick={() => setIsView(!isView)}
                >
                  <EyeOff className="text-gray w-full h-full" />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
