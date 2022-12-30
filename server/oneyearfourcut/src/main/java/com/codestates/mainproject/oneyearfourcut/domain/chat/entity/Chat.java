package com.codestates.mainproject.oneyearfourcut.domain.chat.entity;

import com.codestates.mainproject.oneyearfourcut.domain.chat.dto.ChatResponseDto;
import com.codestates.mainproject.oneyearfourcut.domain.chatroom.entity.ChatRoom;
import com.codestates.mainproject.oneyearfourcut.domain.member.entity.Member;
import com.codestates.mainproject.oneyearfourcut.global.auditable.Auditable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Chat extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM_ID")
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    public Chat(Long roomId, String message, Long senderId) {
        this.message = message;
        this.setChatRoom(new ChatRoom(roomId));
        this.setMember(new Member(senderId));
    }

    public void setMember(Member member) {
        this.member = member;
    }
    public void setChatRoom(ChatRoom chatRoom) {
        chatRoom.setLastChatMessage(this.getMessage());
        System.out.println("this.getMessage() = " + this.getMessage());
        System.out.println("chatRoom.getLastChatMessage() = " + chatRoom.getLastChatMessage());
        this.chatRoom = chatRoom;
    }

    public ChatResponseDto toResponseDto() {
        return ChatResponseDto.builder()
                .chatRoomId(this.chatRoom.getChatRoomId())
                .profile(this.member.getProfile())
                .nickName(this.member.getNickname())
                .message(this.message)
                .createdAt(super.getCreatedAt())
                .build();
    }

}
