import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import TransactionTabBar from "@/components/home/TransactionTabBar";
import { RequestType } from "@/constants/models";
import RequestItem from "@/components/home/RequestItem";
import { RequestStatusType } from "@/constants/utils";
import EmptyRequestListItem from "@/components/home/EmptyRequestListItem";
import { generateDummyRequest } from "@/services/dummyData";

const home = () => {
  const [activeTab, setActiveTab] = useState<RequestStatusType>("pending");
  const [pendingList, setPendingList] = useState<RequestType.Info[]>([]);
  const [processingList, setProcessingList] = useState<RequestType.Info[]>([]);
  const [pickupList, setPickupList] = useState<RequestType.Info[]>([]);
  const [completeList, setCompleteList] = useState<RequestType.Info[]>([]);

  useEffect(() => {
    const query = generateDummyRequest();

    setPendingList(query.filter((item) => item.status === "pending"));
    setProcessingList(query.filter((item) => item.status === "processing"));
    setPickupList(query.filter((item) => item.status === "pickup"));
    setCompleteList(query.filter((item) => item.status === "complete"));
  }, []);

  return (
    <View className="flex-1 px-2 py-4 gap-4">
      <TransactionTabBar
        containerStyle="border-secondary border-2 rounded-xl bg-panel"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <View className="flex-1 border-secondary border-2 bg-panel rounded-xl">
        {activeTab === "pending" ? (
          <FlatList
            data={pendingList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have pending request." />
            )}
          />
        ) : null}
        {activeTab === "processing" ? (
          <FlatList
            data={processingList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a request that is on process." />
            )}
          />
        ) : null}
        {activeTab === "pickup" ? (
          <FlatList
            data={pickupList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a document that is ready to pickup." />
            )}
          />
        ) : null}
        {activeTab === "complete" ? (
          <FlatList
            data={completeList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a completed request yet." />
            )}
          />
        ) : null}
      </View>
    </View>
  );
};

export default home;
