'use client';

import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { messageGetQuery, messageSendQuery } from "../../shared/queries/main";
import { useStore } from "../../shared/hooks/useStore";
import { UiTextarea } from "../../shared/ui/UiTextarea";
import { delay } from "lodash";
import { useOnKey } from "../../shared/hooks/useOnKey";
import Image from 'next/image';
import { useAsyncEffect } from "../../shared/hooks/useAsyncEffect";
import { SpeechRecognition, SpeechRecognitionEvent } from "../../shared/types/SpeechRecognition";

const Client = observer(() => {
    const store = useStore({
        message: '',
        isMessageLoading: false,
        isListening: false,
        allMessages: [{
            role: 'assistant',
            content: 'Привет! Чем могу помочь сегодня?',
        }] as {
            role: 'user' | 'assistant',
            content: string,
        }[]
    });

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useAsyncEffect(async () => {
        const { isSuccess, data } = await messageGetQuery();
        if (isSuccess && data && data.messages?.length > 0) {
            store.set("allMessages", data.messages);
        }
    }, []);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'ru-RU';
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                store.set('message', transcript); // Сохраняем текст в store.message
            };

            recognition.onerror = (event) => {
                store.set('isListening', false);
            };

            recognition.onend = () => {
                store.set('isListening', false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const handleMicClick = () => {
        if (store.isListening) {
            recognitionRef.current?.stop();
        } else {
            store.set('message', ''); // Очищаем текст перед новой записью
            recognitionRef.current?.start();
        }
        store.set('isListening', !store.isListening);
    };

    const handleSend = async () => {
        if (store.message.length === 0 || store.isMessageLoading) return;

        store.set('isMessageLoading', true);
        store.allMessages.push({ role: 'user', content: store.message });
        store.set("message", '');
        store.set("isListening", false);
        scrollToBottom();

        const { isSuccess, data, description } = await messageSendQuery({
            messages: store.allMessages.slice(-10),
        });

        if (isSuccess && data) {
            store.allMessages.push({ role: 'assistant', content: data.message });
        } else if (description) {
            store.allMessages.push({ role: 'assistant', content: 'К сожалению не удалось обработать запрос ;(' });
        }

        scrollToBottom();
        store.set('isMessageLoading', false);
    };

    useOnKey(handleSend);

    const scrollToBottom = () => {
        delay(() => {
            messagesEndRef.current?.scrollTo({
                top: messagesEndRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }, 100);
    };

    return (
        <div className="chat">
            <div className="chat__messages" ref={messagesEndRef}>
                {store.allMessages.map((message, index) => (
                    <div key={index} className={`chat__message ${message.role === 'assistant' ? 'chat__message--incoming' : 'chat__message--outgoing'}`}>
                        <p className="chat__message-text">
                            {message.content.split('###').map((part, i) => (
                                <span key={i}>{part}{i !== message.content.split('###').length - 1 && <br />}</span>
                            ))}
                        </p>
                    </div>
                ))}
                {store.isMessageLoading && (
                    <div className="chat__message chat__message--incoming">
                        <Image
                            src="https://i.gifer.com/2GU.gif"
                            alt="Loading..."
                            width={300}
                            height={300}
                            unoptimized
                        />
                    </div>
                )}
            </div>

            <div className="chat__input">
                <div className="chat__input-field">
                    <UiTextarea
                        name="message"
                        value={store.message}
                        onChange={store.handleChange}
                        placeholder="Введите сообщение..."
                    />
                </div>
                <button
                    className={`chat__button chat__button--send ${(store.message.length === 0 || store.isMessageLoading) && 'chat__button--disabled'}`}
                    onClick={handleSend}
                >
                </button>

                <button
                    className={`chat__button chat__button--mic ${store.isListening ? 'listening' : ''}`}
                    onClick={handleMicClick}
                >
                </button>
            </div>
        </div>
    );
});

export default Client;
