import Button from '../shared/Button';
import Avatar from '../shared/Avatar';

const ChatItem = () => {
  return (
    <Button className="w-full flex justify-center items-center">
      <div className="relative py-3 px-4 w-full flex items-center justify-center gap-2 bg-background-800 rounded-lg transition">
        <Avatar />
        <div className="flex justify-between w-full items-center">
          <div className="flex justify-between h-full gap-1 flex-col text-sm items-start">
            <h4 className="text-white font-medium">Benjo Quilario</h4>
            <span className="text-ice text-xs font-light">
              You: Voice Message
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-ice font-light">15 min ago</span>
            <span className="font-semibold text-white rounded-full h-4 w-4 flex justify-center items-center text-xs bg-red">
              6
            </span>
          </div>
        </div>
      </div>
    </Button>
  );
};

export default ChatItem;
