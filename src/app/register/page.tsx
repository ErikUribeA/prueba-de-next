"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { createUser } from "../api/signup/route";
import { IUserRegistered, IResponseCreateUser } from "../../types/userInterface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Label from "../../components/UI/Label/Label"
import { useTranslations } from "next-intl";

// Estilos usando styled-components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorList = styled.ul`
  margin: 0;
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  list-style: none;
`;

const ErrorItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Register = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const translate = useTranslations('')

  const router: AppRouterInstance = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const newUser: IUserRegistered = {
      email,
      username,
      password,
      name,
      phone
    }

    const res:IResponseCreateUser = await createUser(newUser)

    const responseNextAuth: SignInResponse | undefined = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      toast.error("Ocurrio un error");
      return;
    }
    
    toast.success("Registro exitoso");
    router.push("/login");
  };

  return (
    <Container>
      <Title> {translate('register')} </Title>

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="Name" text={translate('name')}/>
        <Input
          type="text"
          placeholder={translate('name')}
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value )
          }
        />

        <Label htmlFor="Email" text={translate('email')}/>
        <Input
          type="email"
          placeholder={translate('email')}
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value )
          }
        />

        <Label htmlFor="password" text={translate('password')}/>
        <Input
          type="password"
          placeholder={translate('password')}
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Label htmlFor="username" text={translate('username')}/>
        <Input
          type="text"
          placeholder={translate('username')}
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <Label htmlFor="phone" text={translate('phone')}/>
        <Input
          type="text"
          placeholder={translate('phone')}
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <Button type="submit"> {translate('register')} </Button>
      </Form>

      {errors.length > 0 && (
        <ErrorList>
          {errors.map((error) => (
            <ErrorItem key={error}>{error}</ErrorItem>
          ))}
        </ErrorList>
      )}
    </Container>
  );
};

export default Register;
