package com.codestates.mainproject.oneyearfourcut.domain.comment.dto;

import com.codestates.mainproject.oneyearfourcut.domain.comment.entity.Comment;
import com.codestates.mainproject.oneyearfourcut.domain.comment.entity.Reply;
import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
public class CommentRequestDto {

    @NotBlank(message = "댓글은 필수 입력 값입니다.")
    @Size(min = 1, max = 30)
    @SerializedName("content")
    private String content;

    @Builder
    public CommentRequestDto(String content) {
        this.content = content;
    }

    public Comment toCommentEntity(){
        return Comment.builder()
                .content(content)
                .build();
    }

    public Reply toReplyEntity(){
        return Reply.builder()
                .content(content)
                .build();
    }

}
