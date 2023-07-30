import React, { FC, useRef } from "react"
import { Icon, Flex, Box, HStack, useDisclosure } from "@chakra-ui/react"
import { MdWbSunny, MdBrightness2, MdLanguage } from "react-icons/md"

import Menu from "./Menu"
import MobileNavMenu from "./Mobile"
import ButtonLink from "../ButtonLink"
import Link from "../Link"
import Button from "../Button"
import Search from "../Search"
import { EthHomeIcon } from "../icons"
import { useNav } from "./useNav"

export interface IProps {
  path: string
}

// TODO display page title on mobile
const Nav: FC<IProps> = ({ path }) => {
  const {
    ednLinks,
    fromPageParameter,
    i18n,
    isDarkTheme,
    shouldShowSubNav,
    t,
    toggleColorMode,
    linkSections,
    mobileNavProps,
  } = useNav({ path })
  const searchModalDisclosure = useDisclosure()

  const navWrapperRef = useRef(null)

  return (
    <Box position="sticky" top={0} zIndex={100} width="full">
      <Flex
        ref={navWrapperRef}
        as="nav"
        aria-label={t("nav-primary")}
        bg="background.base"
        borderBottom="1px"
        borderColor="rgba(0, 0, 0, 0.1)"
        height="4.75rem"
        justifyContent="center"
        py={4}
        px={{ base: 4, xl: 8 }}
      >
        <Flex
          alignItems={{ base: "center", lg: "normal" }}
          justifyContent={{ base: "space-between", lg: "normal" }}
          width="full"
          maxW="container.2xl"
        >
          <Link
            to="/"
            aria-label={t("home")}
            display="inline-flex"
            alignItems="center"
            textDecor="none"
          >
            <EthHomeIcon opacity={0.85} _hover={{ opacity: 1 }} />
          </Link>
          {/* Desktop */}
          <Flex
            w="full"
            justifyContent={{ base: "flex-end", lg: "space-between" }}
            ml={{ base: 3, xl: 8 }}
          >
            <Menu hideBelow="lg" path={path} sections={linkSections} />
            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap={{ base: 2, xl: 4 }}
            >
              <Search {...searchModalDisclosure} />
              {/* Mobile */}
              <MobileNavMenu
                {...mobileNavProps}
                hideFrom="xl"
                toggleSearch={searchModalDisclosure.onOpen}
                drawerContainerRef={navWrapperRef}
              />
              <HStack spacing={2} hideBelow="xl">
                <Button
                  aria-label={
                    isDarkTheme
                      ? "Switch to Light Theme"
                      : "Switch to Dark Theme"
                  }
                  variant="secondaryGhost"
                  px={1.5}
                  onClick={toggleColorMode}
                >
                  <Icon as={isDarkTheme ? MdWbSunny : MdBrightness2} />
                </Button>
                <ButtonLink
                  to={`/languages/${fromPageParameter}`}
                  leftIcon={<Icon as={MdLanguage} />}
                  variant="secondaryGhost"
                  px={1.5}
                >
                  {t("languages")} {i18n.language.toUpperCase()}
                </ButtonLink>
              </HStack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {shouldShowSubNav && (
        <Flex
          as="nav"
          aria-label={t("nav-developers")}
          display={{ base: "none", lg: "flex" }}
          bg="ednBackground"
          borderBottom="1px"
          borderColor="border"
          boxSizing="border-box"
          py={4}
          px={8}
        >
          {ednLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              isPartiallyActive={link.isPartiallyActive}
              color="text"
              textDecor="none"
              mr={8}
              _hover={{
                color: "primary.base",
                svg: {
                  fill: "currentColor",
                },
              }}
              sx={{
                svg: {
                  fill: "currentColor",
                },
              }}
            >
              {link.text}
            </Link>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default Nav
