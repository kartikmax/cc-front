import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import ListRender from "../components/ListRender";

function About() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);


  return (
    <>
      <h2>About</h2>
      <ListRender
        data={users}
        setData={setUsers}
        usersCollectionRef={usersCollectionRef}
      />
    </>
  );
}

export default About;
