import { useState } from "react";
import { Drawer } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../reducers/navSlice";
import { useEffect } from "react";

export default function SideDrawer({ opener, content }) {
  const isOpened = useSelector((state) => state.navbar.isOpened);

  const dispatch = useDispatch();
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    setOpened(!opened);
  }, [isOpened]);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => {
          setOpened(false);
          dispatch(toggleSideBar(false));
        }}
        size="md"
        className="md:hidden">
        {/* Drawer content */}
        {content}
      </Drawer>

      {/* Opener */}
      <div
        onClick={() => {
          setOpened(!opened);
        }}>
        {opener}
      </div>
    </>
  );
}
