import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { Models } from "appwrite"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { useUserContext } from "@/context/AuthContext"
import { toast, useToast } from "../ui/use-toast"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutation"

type PostFormProps = {
    post?:Models.Document,
    action: 'Create' | 'Update'
}
const PostForm = ({post,action}:PostFormProps) => {
    const {user}=useUserContext()
    const {toast}=useToast()
    const navigate=useNavigate()

    const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();



      // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption:post ? post?.caption: "",
            file: [],
            location:post ? post?.location: "", 
            tags:post ? post.tags.join(','): "",
        },
    })
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if(post && action === 'Update'){
            const updatedPost= await updatePost({
                ...values,
                postId:post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl,
            })
            if(!updatedPost){
                toast({
                    title: 'Could not Update Post, Please try again',
                })
            }
            return navigate(`/posts/${post.$id}`)
        }
        const newPost= await createPost({
            ...values,
            userId:user.id,
        })
        if(!newPost){
            toast({
                title: 'Could not Create Post, Please try again',
            })
        }

        navigate('/')
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        {/*Caption*/}
            <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label px-2">Caption</FormLabel>
                <FormControl>
                    <Textarea className="shad-textarea custom-scrollbar"placeholder="Find your Dreams Come True." {...field} />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />
            {/*File*/}
            <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label px-2">Add Photos</FormLabel>
                <FormControl>
                    <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                    />
                </FormControl>
                
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />
            {/*Location*/}
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label px-2">Add Location</FormLabel>
                <FormControl>
                    <Input 
                    type="text" 
                    className="shad-input rounded-md w-full px-4" 
                    placeholder="Sydney"
                    {...field}
                    />
                </FormControl>
                
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />

            {/*Tags*/}
            <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label px-2">Add Tags (seperated by comma " , ")</FormLabel>
                <FormControl>
                    <Input 
                        type="text" 
                        className="shad-input px-4 rounded-md w-full" 
                        placeholder="Art, Expression, Learn"
                        {...field}
                    />
                </FormControl>
                
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />
            {/*cancel button*/}
            <div className="flex gap-10 items-center justify-center">
            <Button 
            type="button" 
            className="shad-button_dark_4"
            >Cancel</Button>

            <Button 
            type="submit"
            className="shad-button_primary px-5 py-6 whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}

            >
                {isLoadingCreate || isLoadingUpdate && 'Loading...'}
                {action} Post
            </Button>

            </div>
        </form>
        </Form>
    )
}

export default PostForm