import React from "react";
import Sygnet from "./Sygnet";
import Date from "./Date";

interface Props {
  className: string;
}

const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className="sticky top-0 z-10">
      <div className="container">
        <div className="py-10 flex items-start justify-between">
          <Sygnet className={className} />
          <Date className={className} />
        </div>
      </div>
    </div>
  );
};

export default Header;
