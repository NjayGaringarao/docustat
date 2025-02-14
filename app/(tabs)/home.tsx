import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import TransactionTabBar from "@/components/home/TransactionTabBar";
import { RequestType } from "@/constants/models";
import RequestItem from "@/components/home/RequestItem";
import { RequestStatusType } from "@/constants/utils";
import EmptyRequestListItem from "@/components/home/EmptyRequestListItem";
import Loading from "@/components/Loading";
import { color } from "@/constants/color";
import { sortByDate } from "@/lib/commonUtil";
import { useGlobalContext } from "@/context/GlobalProvider";

const home = () => {
  const { userRequestList, refreshUserRecord } = useGlobalContext();
  const [activeTab, setActiveTab] = useState<RequestStatusType>("pending");
  const [pendingList, setPendingList] = useState<RequestType[]>([]);
  const [processingList, setProcessingList] = useState<RequestType[]>([]);
  const [pickupList, setPickupList] = useState<RequestType[]>([]);
  const [completeList, setCompleteList] = useState<RequestType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sortList = async () => {
    setPendingList(
      sortByDate(userRequestList.filter((item) => item.status === "pending"))
    );
    setProcessingList(
      sortByDate(userRequestList.filter((item) => item.status === "processing"))
    );
    setPickupList(
      sortByDate(userRequestList.filter((item) => item.status === "pickup"))
    );
    setCompleteList(
      sortByDate(userRequestList.filter((item) => item.status === "complete"))
    );
    setIsRefreshing(false);
  };

  const onRefreshFeedHandle = useCallback(async () => {
    setIsRefreshing(true);
    refreshUserRecord({ requestList: true });
  }, []);

  useEffect(() => {
    sortList();
  }, [userRequestList]);

  return (
    <View className="flex-1 px-2 py-4 gap-4 bg-background">
      <Text className="font-black text-secondary text-3xl -mb-2">
        TRANSACTION
      </Text>
      <TransactionTabBar
        containerStyle="rounded-xl border-b"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        itemCount={{
          pending: pendingList.length,
          processing: processingList.length,
          pickup: pickupList.length,
        }}
      />
      <View className="flex-1 rounded-xl overflow-hidden">
        {activeTab === "pending" && !isRefreshing ? (
          <FlatList
            data={pendingList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have pending request." />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : activeTab === "processing" && !isRefreshing ? (
          <FlatList
            data={processingList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a request that is on process." />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : activeTab === "pickup" && !isRefreshing ? (
          <FlatList
            data={pickupList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a document that is ready to pickup." />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : activeTab === "complete" && !isRefreshing ? (
          <FlatList
            data={completeList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a completed request yet." />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : (
          <View className="flex-1 items-center justify-center rounded-xl mx-2 my-4 gap-4 bg-background">
            <Loading
              loadingPrompt="Please wait"
              loadingColor={color.secondary}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default home;
