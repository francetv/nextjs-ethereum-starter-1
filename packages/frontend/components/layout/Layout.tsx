import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
// import { useEthers, useNotifications } from '@usedapp/core'
import { useEthers } from '@usedapp/core'
import blockies from 'blockies-ts'
import NextLink from 'next/link'
import React from 'react'
import Balance from '../Balance'
import Head, { MetaProps } from './Head'

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

type LayoutProps = {
  children: React.ReactNode
  customMeta?: MetaProps
}

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const { account, activateBrowserWallet, deactivate } = useEthers()
  // const { notifications } = useNotifications()
  // console.log('notifications', notifications)

  let blockieImageSrc
  if (typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: account }).toDataURL()
  }

  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <Container sx={{ maxWidth: 'container.xl' }}>
          <SimpleGrid
            columns={[1, 1, 1, 2]}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 8,
            }}
          >
            <Flex sx={{ py: [4, null, null, 0] }}>
              <NextLink href="/">
                <Link sx={{ px: 4, py: 2 }}>Home</Link>
              </NextLink>
              <NextLink href="/graph-example">
                <Link sx={{ px: 4, py: 2 }}>Graph Example</Link>
              </NextLink>
              <NextLink href="/signature-example">
                <Link sx={{ px: 4, py: 2 }}>Signature Example</Link>
              </NextLink>
            </Flex>
            {account ? (
              <Flex
                sx={{
                  order: [-1, null, null, 2],
                  alignItems: 'center',
                  justifyContent: ['flex-start', null, null, 'flex-end'],
                }}
              >
                <Balance />
                <Image sx={{ ml: 4 }} src={blockieImageSrc} alt="blockie" />
                <Text sx={{ mx: 4 }}>
                  {account.replace(account.substring(6, 38), '...')}
                </Text>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    deactivate()
                  }}
                >
                  Disconnect
                </Button>
              </Flex>
            ) : (
              <Box
                sx={{
                  order: [-1, null, null, 2],
                  textAlign: ['left', null, null, 'right'],
                }}
              >
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    activateBrowserWallet()
                  }}
                >
                  Connect To MetaMask
                </Button>
              </Box>
            )}
          </SimpleGrid>
        </Container>
      </header>
      <main>
        <Container sx={{ maxWidth: 'container.xl' }}>
          {/* {notifications.map((notification) => {
            console.log('NOTIFICATION', notification)
            if (notification.type === 'walletConnected') {
              return null
            }
            return (
              <p key={notification.id}>
                <strong>{notification.type}</strong>
              </p>
            )
          })} */}
          {children}
        </Container>
      </main>
      <footer>
        <Container sx={{ mt: 8, py: 8, maxWidth: 'container.xl' }}>
          <Text>
            Built by{' '}
            <Link href="https://twitter.com/huntarosan">Hunter Chang</Link>
          </Text>
        </Container>
      </footer>
    </>
  )
}

export default Layout
