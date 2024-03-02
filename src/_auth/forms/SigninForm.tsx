import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queritesAndMutation"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser,isLoading:isUserLoading}=useUserContext()
  const navigate=useNavigate()

  const {mutateAsync: signInAccount} = useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:"",
      password: "",
    },
  })


 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {


    const session= await signInAccount({
      email: values.email,
      password: values.password,
    })



    if(!session){
      return toast({title: "Error", description: "Something went wrong. Please try again.", variant: "destructive",})
    }

    const isLoggedIn=await checkAuthUser();
    
    console.log(isLoggedIn)

    if(isLoggedIn){
      form.reset()


      navigate('/')
    }else{
      return toast({title: "Error", description: "Something went wrong. Please try again.", variant: "destructive",})
    }

  }

  return (
    <Form  {...form}>
      <div className="max-h-screen sm:w-420 flex-center flex-col mt-10">
        <img className="max-h-14" src="/assets/images/logo.png" alt="logo" />
        <h2 className="h3-bold md:h3-bold pt-5 sm:pt-12">Log in to your Account</h2>
        <p className="max-w-xs text-center text-light-3 small-medium md:base-regular my-2">Welcome Back. Please Enter Your Details.</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-5 w-full ">
          
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
            {isUserLoading?(
              <div className="flex-center gap-2">
                <Loader/> Loading...
              </div>
            ):(
              "Sign in"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account? 
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1" >Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )


}
export default SigninForm