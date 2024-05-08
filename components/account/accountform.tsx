import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  AccountFormJSON,
  AccountFormSelectJSON,
  AccountTableData,
} from "@/config/accountjson";
import { Button } from "../ui/button";

import { FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserSchema } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AccountForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      mobile: "",
      role_name: "",
      status: "",
    },
  });

  const createUser = useMutation({
    mutationFn: async (value: any) => {
      const newUser = {
        name: value.name,
        username: value.username,
        email: value.email,
        mobile: value.mobile,
        role_name: value.role_name,
        status: value.status,
      };
      AccountTableData.push(newUser);
      return AccountTableData;
    },
    onSuccess: (value: any) => {
      console.log(value);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (value: any) => {
      console.log("error");
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    // console.log("hi");
    // alert(values);
    // console.log(values);
    createUser.mutate(values);
    form.clearErrors();
    form.reset();
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form
          className="w-full h-full bg-white p-2 text-sm"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {/* form values */}
            {AccountFormJSON.map((data, index) => {
              return (
                <FormField
                  key={index}
                  name={data.name as any}
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-light">
                          {data.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder={data.placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
            {/* select values */}
            {AccountFormSelectJSON.map((data, index) => {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={data.name as any}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-light">
                          {data.label}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={data.placeholder}></SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.content.map((content, i) => {
                              return (
                                <SelectItem key={i} value={content.value}>
                                  {content.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />
              );
            })}
          </div>
          <div className="flex flex-row justify-start py-4 items-center gap-2">
            <Button type="submit" className="bg-theme">
              Add user
              <FaUser className="ml-2 text-white" size={16} />
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                form.clearErrors();
                form.reset();
              }}>
              Clear
              <IoMdCloseCircle className="ml-2 text-black" size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
