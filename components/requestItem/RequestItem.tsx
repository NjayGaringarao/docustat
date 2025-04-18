import React from "react";
import { RequestType } from "@/constants/models";
import PendingItem from "./PendingItem";
import ProcessingItem from "./ProcessingItem";
import PIckupItem from "./PickupItem";
import OtherItem from "./OtherItem";

interface RequestItemProps {
  request: RequestType;
  onPress: () => void;
}
const RequestItem: React.FC<RequestItemProps> = ({ request, onPress }) => {
  if (request.status == "pending") {
    return <PendingItem request={request} onPress={onPress} />;
  } else if (request.status == "processing") {
    return <ProcessingItem request={request} onPress={onPress} />;
  } else if (request.status == "pickup") {
    return <PIckupItem request={request} onPress={onPress} />;
  } else {
    return <OtherItem request={request} onPress={onPress} />;
  }
};

export default RequestItem;
