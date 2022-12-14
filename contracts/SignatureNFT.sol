// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error SignatureNFT__VerifyFailed();

contract SignatureNFT is ERC721 {
    // signer address
    address public immutable i_signer;

    constructor(address signer) ERC721("Test Signature NFT", "TSN") {
        // set signer address
        i_signer = signer;
    }

    // mint NFT
    function mintNft(
        address account,
        uint256 tokenId,
        bytes memory signature
    ) public {
        if (!verify(account, tokenId, signature)) {
            revert SignatureNFT__VerifyFailed();
        }
        _safeMint(account, tokenId);
    }

    // Check if signer and i_signer are equal
    function verify(
        address account,
        uint256 tokenId,
        bytes memory signature
    ) public view returns (bool) {
        address signer = recoverSigner(account, tokenId, signature);
        return signer == i_signer;
    }

    // Return signer address
    function recoverSigner(
        address account,
        uint256 tokenId,
        bytes memory signature
    ) public pure returns (address) {
        // 后招
        bytes32 msgHash = keccak256(abi.encodePacked(account, tokenId));
        bytes32 msgEthHash = ECDSA.toEthSignedMessageHash(msgHash);
        address signer = ECDSA.recover(msgEthHash, signature);
        return signer;
    }
}

