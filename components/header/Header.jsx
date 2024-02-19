import React from "react";
import Link from "next/link";
import Image from "next/image";

import UserEmptyProfile from "/assets/userEmpty.svg";

import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import SearchInput from "../searchComponent/search";

const Header = ({ title, searchInput, onSearchChange, totalShownPrice }) => {
  const router = useRouter();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.homeLink}>
          Eteration
        </Link>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <SearchInput
        value={searchInput}
        onChange={onSearchChange}
        placeholder="Search..."
      ></SearchInput>
      <div className={styles.actionsContainer}>
        <span className={styles.userName}>{totalShownPrice || null}₺</span>
        <Image
          alt="user-emoji"
          src={UserEmptyProfile}
          className={styles.userImage}
        ></Image>
        <span className={styles.userName}>Mustafa Yıldız</span>
      </div>
    </div>
  );
};

export default Header;
