import React from 'react'
import '../style/Register.css'
import { Box, Button, Text } from '@chakra-ui/react'
import { Image,Input,Field } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { RiArrowRightLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useState } from 'react'
import { Toaster, toaster } from './ui/toaster';
import { useNavigate } from 'react-router-dom'


function Register() {

  const navigate=useNavigate()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[number,setNumber]=useState('')

  const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
  number: ""
}); 


  async function handleSubmit(){
  let newErrors = {
    name: "",
    email: "",
    password: "",
    number: ""
  };
  let isValid = true;

  if (!name.trim()) {
    newErrors.name = "This field is required";
    isValid = false;
  }

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

  if (!number.trim()) {
    newErrors.number = "This field is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(number)) {
    newErrors.number = "Invalid mobile number";
    isValid = false;
  }

  setErrors(newErrors);

  if (isValid) {
    const formData = { 
      "name":name,
      "email":email,
      "password":password, 
      "mobileNumber":number 
    };
    
     try{
        await fetch(`${import.meta.env.VITE_BASE_URL}/register`,{
          method:'POST',
          body:JSON.stringify(formData),
          headers:{
            'Content-Type':'Application/json'
          }

        })
        .then(res=>res.text())
        .then(result=>{
            
            if(result == "User already exists")
            {
              toaster.create({
                title: "User already exists !! Sign In to continue..",
                type: "error",
                closable: "true",
                duration: "3000"
            })
            }

            else if(result == "Mobile number already exists")
            {
               toaster.create({
                title: "This mobile number already registered with other account",
                type: "error",
                closable: "true",
                duration: "3000"
            })
            }
            else
            {
              localStorage.setItem("userToken",result)
              toaster.create({
                title: "Sign Up Successfully !!",
                type: "success",
                closable: "true",
                duration: "1800"
            })

            setTimeout(() => {
               navigate('/products')
            }, 1900);
            }
        })
     }
     catch(e){
      
      toaster.create({
                title: "Something went wrong! Sign up failed !!",
                type: "error",
                closable: "true",
                duration: "3000"
            })


     }

    setName('');
    setEmail('');
    setPassword('');
    setNumber('');
    setErrors({});
  }
};
    
  return (
    <>
    <Toaster />
    <Box 
    fontFamily={"serif"}
    fontSize={["15px",null,"30px","30px"]}
    marginLeft={["10%",null,"10%","10%"]}
    marginTop={["10px",null,"30px","30px"]}
    >
        Hey there ,<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Discover more with an account !!
    </Box>
    <Box
      display="flex"
    >
      <Image
      src="/reg_image.jpg"
      height={["",null,"150px","230px"]}
      width={["",null,"300px","530px"]}
      marginTop={["20px",null,"150px","150px"]}
      display={["none", "block", "block", "block"]}
      marginLeft={["",null,"30px","60px"]}
      ></Image>
         
        
           <Box 
               backgroundColor={"white"}
               height={["auto","auto","auto","auto"]}
               width={["90%","200px","50%","40%"]}
               marginLeft={["20px",null,null,null]}
               marginTop={["30px",null,null,null]}
               boxShadow="0 0 5px black"
              //  transition="all 0.3s ease-in-out"
              //     _hover={{
              //     boxShadow: "0 0 5px blue",
              //   }}
               borderRadius="30px"
               px={["17px",null,"17px","17px"]}
               py={["10px",null,"10px","10px"]}
               
           >
          <Field.Root invalid={!!errors.name} required>
              <Field.Label 
              marginLeft={["10px",null,"10px","10px"]}
              marginTop={["10px",null,"10px","10px"]}
              fontSize={["13px",null,"17px","20px"]}

              >
                Name <Field.RequiredIndicator/></Field.Label>

              <Input 

              value={name}
              onChange={(e) => {
               setName(e.target.value);
               if (errors.name) setErrors({ ...errors, name: "" });
                }}
              

              width={[null,null,null,"90%"]}
              marginTop={["3px",null,"5px","5px"]}
              size={["sm",null,null,null]}
              css={{ "--focus-color": "orange" }}
              placeholder='Enter your name'/>
              <Field.ErrorText>{errors.name}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.email} required>
              <Field.Label 
              marginLeft={["10px",null,"10px","10px"]}
              marginTop={["10px",null,"10px","10px"]}
              fontSize={["13px",null,"17px","20px"]}

              >
                Email <Field.RequiredIndicator/></Field.Label>

              <Input 

              value={email}
              onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
              }}

              width={[null,null,null,"90%"]}
              marginTop={["3px",null,"5px","5px"]}
              size={["sm",null,null,null]}
              css={{ "--focus-color": "orange" }}
              placeholder='Enter your Email'/>
              <Field.ErrorText>{errors.email}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password} required>
              <Field.Label 
              marginLeft={["10px",null,"10px","10px"]}
              marginTop={["10px",null,"10px","10px"]}
              fontSize={["13px",null,"17px","20px"]}

              >
                Password <Field.RequiredIndicator/></Field.Label>

              <Input 

              value={password}
              onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: "" });
              }}

              type="password"

              width={[null,null,null,"90%"]}
              marginTop={["3px",null,"5px","5px"]}
              size={["sm",null,null,null]}
              css={{ "--focus-color": "orange" }}
              placeholder='Enter the password'/>
              <Field.ErrorText>{errors.password}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.number} required>
              <Field.Label 
              marginLeft={["10px",null,"10px","10px"]}
              marginTop={["10px",null,"10px","10px"]}
              fontSize={["13px",null,"17px","20px"]}

              >
                Mobile Number <Field.RequiredIndicator/></Field.Label>

              <Input 

              value={number}
              onChange={(e) => {
              setNumber(e.target.value);
              if (errors.number) setErrors({ ...errors, number: "" });
              }}

              type="number"

              width={[null,null,null,"90%"]}
              marginTop={["3px",null,"5px","5px"]}
              size={["sm",null,null,null]}
              css={{ "--focus-color": "orange" }}
              placeholder='Enter your mobile number'/>
              <Field.ErrorText>{errors.number}</Field.ErrorText>
          </Field.Root>
          
          <Button colorPalette="orange" variant="surface"
            size={["xs",null,"md","lg"]}
            marginLeft={["35%",null,"30%","30%"]}
            marginTop={["10px",null,"10px","30px"]}
            onClick={handleSubmit}
          >
               Sign Up <RiArrowRightLine />
          </Button>

          <Box
          fontFamily="serif"
          marginTop={"10px"}
          marginLeft="10px"
          fontSize={[null,null,null,"20px"]}
          >

            Have an account ? <Text as="span" color="orange.400" cursor="pointer"><Link to="/login">Sign In</Link></Text>
          </Box>
          
          
          

          </Box>
    </Box>
      
    </>
  )
}

export default Register
