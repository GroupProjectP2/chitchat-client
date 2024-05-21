import Conversation from "../components/Conversation";
import MessageInput from "../components/MessageInput";
import MessageProfileHeader from "../components/MessageProfileHeader";
import SearchInput from "../components/SearchInput";

export default function Homepage() {
  return (
    <>
      <div className="container mt-5 border p-3">
        <div className="row gap-3">
          <div id="div1" className="col border p-2">
            <SearchInput></SearchInput>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
          </div>
          <div id="div2" className="col border p-2">
            <MessageProfileHeader></MessageProfileHeader>
            <MessageInput></MessageInput>
          </div>
        </div>
      </div>
    </>
  );
}
