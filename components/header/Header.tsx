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
        <div className={className}>
          <div className="py-0 flex items-start justify-between">
            <Sygnet />
            <Date />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
