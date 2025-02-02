import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import TransactionTabBar from "@/components/home/TransactionTabBar";
import { RequestType } from "@/constants/models";
import RequestItem from "@/components/home/RequestItem";
import { RequestStatusType } from "@/constants/utils";
import EmptyRequestListItem from "@/components/home/EmptyRequestListItem";
import { generateDummyRequest } from "@/services/dummyData";
import Loading from "@/components/Loading";
import { color } from "@/constants/color";
import { isLoading } from "expo-font";
import { sortByDate } from "@/lib/commonUtil";

const home = () => {
  const [activeTab, setActiveTab] = useState<RequestStatusType>("pending");
  const [pendingList, setPendingList] = useState<RequestType.Info[]>([]);
  const [processingList, setProcessingList] = useState<RequestType.Info[]>([]);
  const [pickupList, setPickupList] = useState<RequestType.Info[]>([]);
  const [completeList, setCompleteList] = useState<RequestType.Info[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryData = async () => {
    const query = await generateDummyRequest();
    setPendingList(
      sortByDate(query.filter((item) => item.status === "pending"))
    );
    setProcessingList(
      sortByDate(query.filter((item) => item.status === "processing"))
    );
    setPickupList(sortByDate(query.filter((item) => item.status === "pickup")));
    setCompleteList(
      sortByDate(query.filter((item) => item.status === "complete"))
    );
  };

  const onRefreshFeedHandle = useCallback(async () => {
    setIsRefreshing(true);
    await queryData();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    queryData();
  }, []);

  return (
    <View className="flex-1 px-2 py-4 gap-4">
      <TransactionTabBar
        containerStyle="border-secondary border-2 rounded-xl bg-panel"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <View className="flex-1 border-secondary border-2 bg-panel rounded-xl">
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
          <View className="flex-1 items-center justify-center rounded-xl mx-2 my-4 gap-4 bg-panel">
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
