<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\GiftCode\Entity\GiftCodeEntity;

class OwnerScheduledCodeSentNotificationEvent extends AbstractEmailEvent
{
    private static function send(string   $email,
                                Language $lang,
                                int      $quantity,
                                string   $project
    )
    {
        self::sendQuery($email, compact('project', 'lang', 'quantity'));
    }

    public static function sendEvent(GiftCodeEntity $giftCodeEntity)
    {
        self::send(
            email: $giftCodeEntity->getGiftAdoption()->getCustomer()->getEmail(),
            lang: $giftCodeEntity->getGiftAdoption()->getLang(),
            quantity: $giftCodeEntity->getGiftAdoption()->getQuantity(),
            project: $giftCodeEntity->getGiftAdoption()->getProject()->value
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::OWNER_GIFT_CODE_SENT;
    }
}