import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

type LoadingButtonProps = ButtonProps & {
    loading: boolean;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, onClick, children, className, disabled, ...props }) => {
    return (
        <Button
            onClick={onClick}
            className={cn(
                'px-4 py-2 rounded-lg transition-all duration-300',
                loading ? 'cursor-wait' : '',
                className
            )}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? 'Pending...' : children}
        </Button>
    );
};

export default LoadingButton;
