import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import TransactionTabBar from "@/components/home/TransactionTabBar";
import { RequestType } from "@/constants/models";
import RequestItem from "@/components/admin/RequestItem";
import { RequestStatusType } from "@/constants/utils";
import EmptyRequestListItem from "@/components/home/EmptyRequestListItem";
import Loading from "@/components/Loading";
import { color } from "@/constants/color";
import { sortByUpdatedAt } from "@/lib/commonUtil";
import { getRequestList } from "@/services/request";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import PickupItem from "@/components/admin/requestItem/PickupItem";
import { useGlobalContext } from "@/context/GlobalProvider";

const home = () => {
  const { isRefreshAdminData, setIsRefreshAdminData } = useGlobalContext();
  const [requestList, setRequestList] = useState<RequestType[]>([]);
  const [activeTab, setActiveTab] = useState<RequestStatusType>("pending");
  const [pendingList, setPendingList] = useState<RequestType[]>([]);
  const [processingList, setProcessingList] = useState<RequestType[]>([]);
  const [pickupList, setPickupList] = useState<RequestType[]>([]);
  const [completeList, setCompleteList] = useState<RequestType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryRequestList = async () => {
    try {
      setIsRefreshing(true);
      setRequestList(await getRequestList());
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch request list",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const sortList = async () => {
    setPendingList(
      sortByUpdatedAt(
        requestList.filter((item) => item.status === "pending"),
        true
      )
    );
    setProcessingList(
      sortByUpdatedAt(
        requestList.filter((item) => item.status === "processing"),
        true
      )
    );
    setPickupList(
      sortByUpdatedAt(
        requestList.filter((item) => item.status === "pickup"),
        true
      )
    );
    setCompleteList(
      sortByUpdatedAt(requestList.filter((item) => item.status === "complete"))
    );
    setIsRefreshing(false);
  };

  const onRefreshFeedHandle = useCallback(async () => {
    queryRequestList();
  }, []);

  useEffect(() => {
    sortList();
  }, [requestList]);

  useEffect(() => {
    queryRequestList();
  }, []);

  useEffect(() => {
    if (isRefreshAdminData) {
      queryRequestList();
      setIsRefreshAdminData(false);
    }
  }, [isRefreshAdminData]);

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
              <EmptyRequestListItem message="No pending request." />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : activeTab === "processing" && !isRefreshing ? (
          <FlatList
            data={processingList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="No on-process request" />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : activeTab === "pickup" && !isRefreshing ? (
          <FlatList
            data={pickupList}
            renderItem={({ item }) => (
              <PickupItem
                request={item}
                onPress={() => router.push(`/manageRequest/${item.id}`)}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="No for-pickup requests" />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : activeTab === "complete" && !isRefreshing ? (
          <FlatList
            data={completeList}
            renderItem={({ item }) => <RequestItem request={item} />}
            ListEmptyComponent={() => (
              <EmptyRequestListItem message="No completed requests" />
            )}
            onRefresh={onRefreshFeedHandle}
            refreshing={isRefreshing}
          />
        ) : (
          <View className="flex-1 items-center justify-center rounded-xl my-4 gap-4 bg-background">
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
