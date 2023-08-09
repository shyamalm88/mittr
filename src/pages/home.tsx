import Button from "@mui/material/Button";
import { useRef } from "react";
import { ComponentInputProps } from "../types";

const Home = ({ data }: ComponentInputProps) => {
  const titleRef = useRef(null);
  const displayTitle = () => {
    console.log(titleRef.current);
  };
  return (
    <>
      {data.map((item: any) => {
        return (
          <div key={item.id}>
            <div ref={titleRef}>{item.title}</div>
            <hr></hr>
          </div>
        );
      })}

      <Button variant="outlined" onClick={displayTitle}>
        Outlined
      </Button>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  return { props: { data } };
}
