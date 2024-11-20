'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Input as NumberInput } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImagePlus } from 'lucide-react'
import { useState } from "react"
import Image from 'next/image'

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^\+234\d{10}$/, "Invalid Nigerian phone number"),
  image: z.any().optional(),
  bankName: z.string().min(1, "What bank?"),
  accountNumber: z.string().regex(/^\d{1,10}$/, "Account number must be 10 digits"),
  chargePerThousand: z.number().min(0, "Charge must be a positive number"),
  qrId: z.string().min(1, "QR ID is required"),
})

export default function Component() {
  const [image, setImage] = useState<string | null>(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "+234",
      image: undefined,
      bankName: "",
      accountNumber: "",
      chargePerThousand: 0,
      qrId: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }


  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">TRADER DATA COLLECTION FORM</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Image Upload</FormLabel>
      <FormControl>
        <div className="relative">
          <Button
            variant="outline"
            className="w-full h-32 border-dashed"
            onClick={() => document.getElementById('image-upload')?.click()}
            type="button"
          >
            {image ? (
              <Image
                src={image}
                alt="Uploaded"
                width={112}
                height={112}
                className="max-h-28 object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImagePlus className="h-8 w-8" />
                <div className="text-xs text-muted-foreground">
                  Click to upload image
                </div>
              </div>
            )}
          </Button>
          <input
            id="image-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(reader.result as string);
                    field.onChange(file);
                  };
                  reader.readAsDataURL(file);
                } else {
                  alert('Please upload a valid image file (jpg, jpeg, or png)');
                }
              }
            }}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="access">Access Bank</SelectItem>
                    <SelectItem value="gtb">GTBank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="first">First Bank</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="001 001 0001" 
                    {...field} 
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chargePerThousand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Charges</FormLabel>
                <FormControl>
                  <NumberInput
                    type="number"
                    placeholder="How much per ₦1000?"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qrId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>QR ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter QR ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}