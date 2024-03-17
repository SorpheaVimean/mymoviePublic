import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Collapse,
  ConfigProvider,
} from "antd";
import { Button } from "@material-tailwind/react";

import logo from "../../assets/logo.png";
import { createStyles } from "antd-style";
import { IoMenuOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { MdPerson } from "react-icons/md";


const useStyle = createStyles(() => ({
  "my-drawer-body": {
    background: "#191A19",
    color: "white",
  },
  "my-drawer-header": {
    background: "#191A19",
    color: "#4E9F3D",
  },
}));
const HeaderPage = () => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const { styles } = useStyle();
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [showLoginButtons, setShowLoginButtons] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLoginButtons(window.innerWidth >= 960);
    };

    // Call handleResize initially and add event listener for window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showLogin = () => {
    setOpenLogin(true);
  };
  const showLoginNext = () => {
    setOpenSignin(false);
    setOpenLogin(true);
  };
  const okLogin = () => {
    setOpenLogin(false);
  };
  const cancelLogin = () => {
    setOpenLogin(false);
  };
  const showSignin = () => {
    setOpenSignin(true);
  };
  const showSigninNext = () => {
    setOpenLogin(false);
    setOpenSignin(true);
  };
  const okSignin = () => {
    setOpenSignin(false);
  };
  const cancelSignin = () => {
    setOpenSignin(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const classNames = {
    body: styles["my-drawer-body"],

    header: styles["my-drawer-header"],
    content: styles["my-drawer-content"],
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleSearch = () => {
    const inputValue = inputRef.current.value;
    window.location.href = `/search/${inputValue}`;
  };

  const gener = [
    {
      id: 1,
      name: "Action",
    },
    {
      id: 2,
      name: "Action & Adventure",
    },
    {
      id: 3,
      name: "Animation",
    },
    {
      id: 4,
      name: "Biography",
    },
    {
      id: 5,
      name: "Comedy",
    },
  ];
  const items = [
    {
      key: "1",
      label: "Genre",
      children: (
        <div className=" flex flex-wrap justify-between items-center ">
          {gener.map((gen, index) => (
            <div
              key={index}
              className=" text-gray-300 hover:text-green-600 cursor-pointer duration-300 text-[13px] w-[50%] mb-2"
            >
              {gen.name}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Countries",
      children: (
        <div className=" flex flex-wrap justify-between items-center ">
          {gener.map((gen, index) => (
            <div
              key={index}
              className=" text-gray-300 hover:text-green-600 cursor-pointer duration-300 text-[13px] w-[50%] mb-2"
            >
              {gen.name}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center  my-container ">
        <div className="flex justify-center items-center md:gap-7 ">
          <Button className="bg-transparent" onClick={showDrawer}>
            <IoMenuOutline className="text-4xl" />
          </Button>
          <Link to={"/"} className="">
            <img src={logo} className="w-14 md:w-20" alt="logo" />
          </Link>
          {/* // =================Drawer Menu=================== // */}

          <Drawer
            title=" "
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            classNames={classNames}
            extra={
              <button
                className="hover:bg-black rounded-full duration-200"
                onClick={onClose}
              >
                <IoIosClose className="text-5xl" />
              </button>
            }
          >
            <div className=" space-y-7">
              <div className="block md:hidden">
                <div className="relative mb-3 flex  ">
                  <input
                    ref={inputRef}
                    type="text"
                    className="peer  m-0 block min-h-[auto] w-[400px] rounded-s-xl  bg-gray-700 bg-opacity-50 bg-clip-padding px-5 py-4 text-base font-normal leading-tight text-white transition duration-200 ease-linear placeholder:text-transparent focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-white focus:bg-gray-600 focus:outline-none peer-focus:text-primary  dark:text-white dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-3 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
                    Search Movies and TVShows
                  </label>
                  <div
                    className=" flex justify-center items-center bg-Background bg-opacity-40 hover:bg-green-600 px-3 rounded-e-xl duration-300 cursor-pointer"
                    onClick={handleSearch}
                  >
                    <IoIosSearch className="text-2xl" />
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold hover:text-green-600 cursor-pointer duration-300 border-b border-opacity-50 border-gray-400 pb-2">
                <Link
                  to={"/"}
                  onClick={onClose}
                  className="hover:text-green-600"
                >
                  Home
                </Link>
              </div>
              <div className="text-xl font-bold hover:text-green-600 cursor-pointer duration-300 border-b border-opacity-50 border-gray-400 pb-2">
                <Link
                  to={"/latestMovie"}
                  onClick={onClose}
                  className="hover:text-green-600"
                >
                  Movies
                </Link>
              </div>
              <div className="text-xl font-bold hover:text-green-600 cursor-pointer duration-300 border-b border-opacity-50 border-gray-400 pb-2">
                <Link
                  to={"/latesTVShow"}
                  onClick={onClose}
                  className="hover:text-green-600"
                >
                  TV Shows
                </Link>
              </div>
              <div className="text-xl font-bold hover:text-green-600 cursor-pointer duration-300 border-b border-opacity-50 border-gray-400 pb-2">
                <Link
                  to={"/topRatingMovie"}
                  onClick={onClose}
                  className="hover:text-green-600"
                >
                  Top Rating
                </Link>
              </div>
              <div className=" custom-collapse">
                <ConfigProvider
                  theme={{
                    components: {
                      Collapse: {
                        contentBg: "transparent",
                        headerBg: "white",
                        headerPadding: "12px 0",
                        colorText: "white",
                        colorTextHeading: "white",
                        fontSizeIcon: 18,
                      },
                    },
                  }}
                >
                  <Collapse
                    expandIconPosition={"end"}
                    // ghost={true}
                    accordion
                    items={items}
                    bordered={false}
                    className="text-xl  font-bold bg-transparent "
                  />
                </ConfigProvider>
              </div>

              {/* <div className="text-xl font-bold hover:text-green-600 cursor-pointer duration-300 border-b border-opacity-50 border-gray-400 pb-2">
                <Collapse
                  expandIconPosition="end"
                  items={{
                    key: "1",
                    label: "This is panel header with arrow icon",
                    children: <p>Tedsfsdfsdfsdfxt</p>,
                  }}
                />
              </div> */}
            </div>
          </Drawer>
        </div>

        {/* ====================Search===================== */}
        <div className="hidden md:block">
          <div className="relative mb-3 flex  ">
            <input
              ref={inputRef}
              type="text"
              className="peer  m-0 block min-h-[auto] w-[400px] rounded-s-xl  bg-Background bg-opacity-50 bg-clip-padding px-5 py-4 text-base font-normal leading-tight text-white transition duration-200 ease-linear placeholder:text-transparent focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-white focus:bg-Background focus:outline-none peer-focus:text-primary  dark:text-white dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-3 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
              Search Movies and TV Shows
            </label>
            <div
              className=" flex justify-center items-center bg-Background bg-opacity-40 hover:bg-green-600 px-3 rounded-e-xl duration-300 cursor-pointer"
              onClick={handleSearch}
            >
              <IoIosSearch className="text-2xl" />
            </div>
          </div>
        </div>

        {showLoginButtons ? (
          <div className="flex justify-center items-center gap-5">
            <Button
              className="bg-green-600 text-white text-lg font-bold py-2 px-7 rounded-lg hover:bg-opacity-85 hover:scale-105 duration-300"
              onClick={showLogin}
            >
              Login
            </Button>
            <Button
              className="border-2 border-green-600  text-lg font-bold py-2 px-5 rounded-lg hover:bg-opacity-85 hover:scale-105 duration-300"
              onClick={showSignin}
            >
              Sign Up
            </Button>
          </div>
        ) : (
          <Button className="bg-green-600 rounded-full p-2 cursor-pointer">
            <MdPerson className="text-3xl text-white " onClick={showLogin} />
          </Button>
        )}

        {/* ==================  Modal Login===================== */}
        <Modal
          title="Basic Modal"
          footer={false}
          centered
          open={openLogin}
          onOk={okLogin}
          onCancel={cancelLogin}
        >
          <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div className="text-gray-500 hover:underline cursor-pointer">
                Forget Password?
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full bg-green-600 text-white text-lg font-bold py-2 px-7 rounded-lg hover:bg-opacity-85 hover:scale-105 duration-300"
                onClick={showLogin}
              >
                Login
              </Button>
            </Form.Item>
            <Divider />
            <div className="text-center">
              Don't have an account?
              <span
                className="text-green-600 hover:underline cursor-pointer"
                onClick={showSigninNext}
              >
                Register
              </span>
            </div>
          </Form>
        </Modal>
        
        {/* ================ Modal Sign Up===================== */}
        <Modal
          title="Basic Modal"
          footer={false}
          centered
          open={openSignin}
          onOk={okSignin}
          onCancel={cancelSignin}
        >
          <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="Confirm-password"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm password!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlTypes="submit"
                className="w-full bg-green-600 text-white text-lg font-bold py-2 px-7 rounded-lg hover:bg-opacity-85 hover:scale-105 duration-300"
                onClick={showLogin}
              >
                Sign Up
              </Button>
            </Form.Item>
            <Divider />
            <div className="text-center">
              Already have an account?{" "}
              <span
                className="text-green-600 hover:underline cursor-pointer"
                onClick={showLoginNext}
              >
                Login
              </span>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default HeaderPage;
