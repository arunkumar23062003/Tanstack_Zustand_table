import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import axios from "axios";
import { useStore } from "@/state";
import { toast } from "sonner";

const AccountForm = () => {
  const queryClient = useQueryClient();
  const user = useStore((state: any) => state.user);
  const removeUser = useStore((state: any) => state.removeUser);
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      mobile: "",
      role_name: "",
    },
  });

  const createuser = useMutation({
    mutationFn: async (val: any) => {
      const response = user
        ? await axios.put(`/api/register/${user.id}`, val)
        : await axios.post("/api/register", val);
      removeUser();
      return response.data;
    },
    onSuccess: () => {
      toast.success("Successfully registered", {
        position: "top-right",
        dismissible: true,
      });
      form.clearErrors();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      console.log("something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    createuser.mutate(values);
  };

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("username", user.username);
      form.setValue("email", user.email);
      form.setValue("mobile", user.mobile);
      form.setValue("role_name", user.role_name);
      form.setValue("password", user.password);
      form.setValue("status", user.status);
    }
  }, [user, form]);

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
                          value={form.watch(
                            data.name === "role_name" ? "role_name" : "status"
                          )}
                          onValueChange={(value) => {
                            data.name === "role_name"
                              ? form.setValue("role_name", value)
                              : form.setValue("status", value);
                          }}>
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
                        <FormMessage />
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
                form.setValue("role_name", "");
                form.setValue("status", "");
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
