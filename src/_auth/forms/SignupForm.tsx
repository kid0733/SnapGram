import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"

import { useToast } from "@/components/ui/use-toast"

const SignupForm = () => {
  const { toast } = useToast()
  const isLoading=true
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser= await createUserAccount(values);

    if(!newUser){
      
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }

    // const sesion= await signInAccount()
  }

  return (
    <Form  {...form}>
      <div className="max-h-screen sm:w-420 flex-center flex-col mt-10">
        <img className="max-h-14" src="/assets/images/logo.png" alt="logo" />
        <h2 className="h3-bold md:h3-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="max-w-xs text-center text-light-3 small-medium md:base-regular my-2">To use Snapgram enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-5 w-full ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input " placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input " placeholder="Enter your Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input " placeholder="someone@somwhere.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input " placeholder="Atleast 6 letters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isLoading?(
              <div className="flex-center gap-2">
                <Loader/> Loading...
              </div>
            ):(
              "Sign up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            ALready have an account? 
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1" >Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )


}
export default SignupForm