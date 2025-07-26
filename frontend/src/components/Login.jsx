import { Box, Button, Field, Image, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiArrowRightLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toaster } from './ui/toaster';


function Login() {

  const navigate=useNavigate()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  async function handleSubmit() {
    let newErrors = {
      email: "",
      password: ""
    };
    let isValid = true;


    if (!email.trim()) {
      newErrors.email = "This field is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email";
      isValid = false;
      setEmail('');
    }

    if (!password.trim()) {
      newErrors.password = "This field is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }


    setErrors(newErrors);

    if (isValid) {
      const formData =
      {
        "email": email,
        "password": password
      }
      try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'Application/json'
          }

        })
          .then((res) => res.text())
          .then(result => {
            if (result == "Invalid credentials") {
              toaster.create({
                title: "Wrong password!!",
                type: "error",
                closable: "true",
                duration: "3000"
              })
            }
            else if (result == "User does not exists") {
              toaster.create({
                title: "User not exists !! Sign Up to continue..",
                type: "error",
                closable: "true",
                duration: "3000"
              })
            }
            else{

              localStorage.setItem("userToken",result)
              toaster.create({
                title: "Logged In Successfully",
                type: "success",
                closable: "true",
                duration: "1800",
                
              })
              setTimeout(() => {

                navigate('/products')
                
              }, 1900);
            }

          })
      }
      catch (e) {
        toaster.create({
          title: "Something went wrong! Sign In failed !!",
          type: "error",
          closable: "true",
          duration: "3000"
        })

      }

      setEmail('');
      setPassword('');
      setErrors({});
    }
  };

  return (
    <>
      <Toaster />

      <Box
        display="flex"
      >
        <Box
          backgroundColor={"white"}
          height={["auto", "auto", "max-content", "max-content"]}
          width={["90%", "200px", "50%", "50%"]}
          marginLeft={["20px", null, "5%", "5%"]}
          marginRight={["20px", null, "5%", "5%"]}
          marginTop={["50px", null, "8%", "8%"]}
          paddingBottom={["10px", null, "10px", "10px"]}
          //  boxShadow="0 0 5px black"
          //  transition="all 0.3s ease-in-out"
          //     _hover={{
          //     boxShadow: "0 0 5px blue",
          //   }}
          //  borderRadius="30px"
          px={["17px", null, "7px", "17px"]}
          py={["10px", null, "10px", "10px"]}

        >
          <Box
            fontFamily={"serif"}
            color={"orange.400"}
            fontSize={["20px", null, "30px", "30px"]}
            marginLeft={["20%", null, "20%", "25%"]}
            marginTop={["10px", null, "10px", "10px"]}
          >
            Welcome back !!
          </Box>


          <Field.Root invalid={!!errors.email} required>
            <Field.Label
              marginLeft={["10px", null, "10px", "10px"]}
              marginTop={["10px", null, "10px", "10px"]}
              fontSize={["13px", null, "17px", "20px"]}

            >
              Email <Field.RequiredIndicator /></Field.Label>

            <Input

              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}

              width={[null, null, null, "90%"]}
              marginTop={["3px", null, "5px", "5px"]}
              size={["sm", null, null, null]}
              css={{ "--focus-color": "orange" }}
              placeholder='Enter your Email' />
            <Field.ErrorText>{errors.email}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password} required>
            <Field.Label
              marginLeft={["10px", null, "10px", "10px"]}
              marginTop={["10px", null, "10px", "10px"]}
              fontSize={["13px", null, "17px", "20px"]}

            >
              Password <Field.RequiredIndicator /></Field.Label>

            <Input

              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}

              type="password"

              width={[null, null, null, "90%"]}
              marginTop={["3px", null, "5px", "5px"]}
              size={["sm", null, null, null]}
              css={{ "--focus-color": "orange" }}
              placeholder='Enter the password' />
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          </Field.Root>



          <Button colorPalette="orange" variant="surface"
            size={["xs", null, "md", "lg"]}
            marginLeft={["35%", null, "30%", "30%"]}
            marginTop={["10px", null, "10px", "30px"]}
            onClick={handleSubmit}
          >
            Sign In <RiArrowRightLine />
          </Button>

          <Box
            fontFamily="serif"
            marginLeft="10px"
            marginTop={"15px"}
            fontSize={[null, null, null, "20px"]}
          >
            Don't have an account ? <Text as="span" color="orange.400" cursor="pointer"><Link to="/register">Sign Up</Link></Text>
          </Box>


        </Box>
        <Image
          src="/login_bg.png"
          height={[null, null, "100vh", "100vh"]}
          width={[null, null, "50%", "50%"]}
          marginTop={["20px", null, "0px", "0px"]}
          display={["none", "block", "block", "block"]}
          marginLeft={[null, null, "20px", "20px"]}
        ></Image>

      </Box>
    </>
  )
}

export default Login
