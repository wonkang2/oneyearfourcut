package com.codestates.mainproject.oneyearfourcut.domain.member.service;

import com.codestates.mainproject.oneyearfourcut.domain.member.dto.MemberRequestDto;
import com.codestates.mainproject.oneyearfourcut.domain.member.dto.MemberResponseDto;
import com.codestates.mainproject.oneyearfourcut.domain.member.entity.Member;
import com.codestates.mainproject.oneyearfourcut.domain.member.entity.MemberStatus;
import com.codestates.mainproject.oneyearfourcut.domain.member.repository.MemberRepository;
import com.codestates.mainproject.oneyearfourcut.global.exception.exception.BusinessLogicException;
import com.codestates.mainproject.oneyearfourcut.global.exception.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    public void createMember(Member postMember) {
        if (!memberRepository.findByEmail(postMember.getEmail()).isPresent()) {
            memberRepository.save(postMember);
        }
    }

    public MemberResponseDto modifyMember(Long memberId, MemberRequestDto memberRequestDto) {
        Member findMember = findMember(memberId);

        Optional.ofNullable(memberRequestDto.getNickname())
                        .ifPresent(findMember::updateNickname);

        if (!memberRequestDto.getProfile().isEmpty()) {
            //이미지 저장하고, 해당 경로를 findMember에 넣어주는 로직
        }

        Member savedMember = memberRepository.save(findMember);

        return savedMember.toMemberResponseDto();
    }

    @Transactional(readOnly = true)
    public Member findMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Member findMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void deleteMember(Long memberId) {
        Member findMember = findMember(memberId);//회원이 존재하는지 확인

        findMember.updateStatus(MemberStatus.DELETE);
    }
}