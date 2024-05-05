"use client";
import AccountForm from "@/components/account/accountform";
import AccountList from "@/components/account/accountlist";
import LayoutContainer from "@/components/common/layoutcontainer";
import React from "react";

const Account = () => {
  return (
    <LayoutContainer>
      <div className="w-full p-2">
        <AccountForm />
      </div>
      <div className="w-full p-2">
        <AccountList />
      </div>
    </LayoutContainer>
  );
};

export default Account;
