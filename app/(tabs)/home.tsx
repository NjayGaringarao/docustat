import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import TransactionTabBar from "@/components/TransactionTabBar";
import { RequestType } from "@/constants/models";
import RequestItem from "@/components/requestItem/RequestItem";
import { RequestStatusType, TabBarType } from "@/constants/utils";
import EmptyRequestListItem from "@/components/requestItem/EmptyRequestListItem";
import Loading from "@/components/Loading";
import { color } from "@/constants/color";
import { sortByDate } from "@/lib/commonUtil";
import { useGlobalContext } from "@/context/GlobalProvider";
import PickupItem from "@/components/requestItem/PickupItem";
import { router } from "expo-router";

const home = () => {
  const { userRequestList, refreshUserRecord } = useGlobalContext();
  const [activeTab, setActiveTab] = useState<TabBarType>("active");
  const [activeList, setActiveList] = useState<RequestType[]>([]);
  const [archiveList, setArchiveList] = useState<RequestType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sortList = async () => {
    setActiveList(
      sortByDate(
        userRequestList.filter(
          (item) =>
            item.status === "pending" ||
            item.status === "processing" ||
            item.status === "pickup"
        )
      )
    );
    setArchiveList(
      sortByDate(
        userRequestList.filter(
          (item) => item.status === "success" || item.status === "failed"
        )
      )
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
        Transaction
      </Text>
      <TransactionTabBar
        containerStyle="rounded-xl border-b"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        itemCount={activeList.length}
      />
      <View className="flex-1 rounded-xl overflow-hidden">
        {activeTab === "active" && !isRefreshing ? (
          <FlatList
            data={activeList}
            renderItem={({ item }) => (
              <RequestItem
                request={item}
                onPress={() => router.push(`/viewRequest/${item.id}`)}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a request that is active on admin list." />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : activeTab === "archive" && !isRefreshing ? (
          <FlatList
            data={archiveList}
            renderItem={({ item }) => (
              <RequestItem
                request={item}
                onPress={() => router.push(`/viewRequest/${item.id}`)}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="You don't have a request that is on archive." />
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
