import { notification } from "antd";

const DEFAULT_NOTIFICATION_CONFIG = {
    placement: "top",
    duration: 3,
};

const RETURN_TO_LAUNCH_SUCCESS_MESSAGE = {
    message: "Return to Launch Success",
    description: "Returning to launch...",
};

const RETURN_TO_LAUNCH_ERROR_MESSAGE = {
    message: "Return to Launch Error",
    description: "Error returning to launch.",
};

export function notifyReturnSuccess() {
    notification.success({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...RETURN_TO_LAUNCH_SUCCESS_MESSAGE,
    });
}

export function notifyReturnError() {
    notification.error({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...RETURN_TO_LAUNCH_ERROR_MESSAGE,
    });
}
