const NavbarLinksItem = ({ link }) => {
  const handleClick = () => {
    let text = link.text;
    if (text == "Категории") {
      sessionStorage.setItem("category", "beauty");
    }
  };

  return (
    <li className="navbar__links-item">
      <a
        href={link?.to && `${link.to}`}
        onClick={() => handleClick()}
        className="navbar__links-item-link"
      >
        {link.text}
      </a>
    </li>
  );
};

export default NavbarLinksItem;
