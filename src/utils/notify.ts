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

const TELEMETRY_WARNING_MESSAGE = {
    message: "Telemetry Warning",
    description: "Telemetry data is not available.",
}

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

export function notifyTelemetryWarning() {
    notification.error({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...TELEMETRY_WARNING_MESSAGE,
    });
}
