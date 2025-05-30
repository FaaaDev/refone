import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { PasswordField } from "./ui/password_field";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email" })
    .min(1, { message: "Email cannot empty" }),
  password: z.string().min(8, { message: "Password minimum is 8 charracter" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const loginMutation = trpc.auth.login.useMutation();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    // changing to validation from server because in here has error
    // error TS2589: Type instantiation is excessively deep and possibly infinite.
    // resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    login({ email: values.email, password: values.password });
  }

  const login = (values: { email: string; password: string }) => {
    setLoading(true);
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        // handle success
        console.log("Login success:", data);
        setLoading(false);
      },
      onError: (error) => {
        // handle error, e.g., show error message
        setLoading(false);
        try {
          // trying parse error.message to JSON
          const errors = JSON.parse(error.message);

          if (Array.isArray(errors)) {
            errors.forEach((err) => {
              // mapping error to field
              const field = err.path?.[0] || "root";
              const message = err.message || "Unknown error";

              // Set error to field
              form.setError(field, { message });
            });
          } else {
            // Fallback error isn't array
            form.setError("root", { message: error.message });
          }
        } catch (e) {
          // If error isn't JSON, use default fallback
          if (
            error?.message.toLowerCase().includes("credential") ||
            error?.message.toLowerCase().includes("user") ||
            error?.message.toLowerCase().includes("email")
          ) {
            form.setError("email", { message: error.message || "" });
          }
          if (error?.message.toLowerCase().includes("password")) {
            form.setError("password", { message: error.message || "" });
          }
          console.error("Login error:", error.message);
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordField control={form.control} />
            <div className="flex items-center justify-end w-full">
              <Button
                className="mt-4 justify-end"
                type="submit"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
